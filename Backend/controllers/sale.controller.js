const db = require("../database/db");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

//Leer datos de las ventas
exports.getSales = (req, res) => {
    db.all("SELECT * FROM sales", [], (err, rows) => {
        if (err) {
            console.error("ERROR AL INSERTAR SALE:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

//Guardar las ventas realizadas
exports.createSale = (req, res) => {
    const { cart, subtotal, iva, total, metodo_pago } = req.body;

    const total_input = cart.reduce((acc, item) => acc + (item.quantity * item.price_input), 0);
    const tipe_sale = metodo_pago || "tarjeta";

    db.run(
        `INSERT INTO sales (subtotal, iva, total, total_input, tipe_sale) VALUES (?, ?, ?, ?, ?)`,
        [subtotal, iva, total, total_input, tipe_sale],
        function (err) {
            if (err) return res.status(500).json(err);

            const saleId = this.lastID;

            const stmt = db.prepare(`
                INSERT INTO sale_items (sale_id, product_id, quantity, price, price_input, tipe_sale)
                VALUES (?, ?, ?, ?, ?, ?)
            `);

            cart.forEach(item => {
                stmt.run(
                    saleId,
                    item.id,
                    item.quantity,
                    item.price_sale,
                    item.price_input,
                    tipe_sale
                );
            });

            stmt.finalize();

            res.json({ message: "Venta guardada correctamente", saleId: saleId });
        }
    );
};


//Mostrar ventas por mes
exports.getSalesMonth = (req, res) => {

    db.all(`
        SELECT 
            SUM(total) AS monthlySales,
            SUM(total_input) AS total_inputm,
            COUNT(*) AS totalSales,
            SUM(iva) AS ivaGenerated,
            AVG(total) AS avgTicket
        FROM sales
        WHERE strftime('%m', created_at, 'localtime') = strftime('%m', 'now', 'localtime')
        AND strftime('%Y', created_at, 'localtime') = strftime('%Y', 'now', 'localtime')
    `,
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json(rows[0]);
        });
};

//Ventas de hoy
exports.getSalesDay = (req, res) => {
    db.get(`
        SELECT 
            SUM(total) AS sales,
            SUM(total_input) AS total_input,
            COUNT(*) AS totalSales,
            SUM(iva) AS ivaGenerated,
            AVG(total) AS avgTicket
        FROM sales
        WHERE strftime('%Y-%m-%d', created_at, 'localtime') = strftime('%Y-%m-%d', 'now', 'localtime')
    `, [], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
};

// Historial de ventas por dia (Para la grafica)
exports.getSalesHistory = (req, res) => {

    db.all(`
            SELECT 
                strftime('%Y-%m-%d', created_at, 'localtime') AS day,
                SUM(total) AS total,
                SUM(total) - SUM(total_input) - SUM(iva) AS profit
            FROM sales
            GROUP BY day
            ORDER BY day ASC;
        `,
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json(rows);
        });
};


//Ganancias por fecha
exports.getReportByDate = (req, res) => {

    const { start, end } = req.query;

    db.get(`
        SELECT 
            SUM(total) as revenue,
            SUM(iva) as iva,
            COUNT(*) as totalSales,
            AVG(total) as avgTicket
        FROM sales
        WHERE date(created_at, 'localtime') BETWEEN date(?) AND date(?)
    `, [start, end], (err, row) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(row);
    });
};

//ventas por filtros para grafica
exports.getSalesByRange = (req, res) => {

    const { start, end } = req.query;

    db.all(`
        SELECT 
            strftime('%Y-%m-%d', created_at, 'localtime') as day,
            SUM(total) as total,
            SUM(total) - SUM(total_input) - SUM(iva) AS profit
        FROM sales
        WHERE date(created_at, 'localtime') BETWEEN date(?) AND date(?)
        GROUP BY day
        ORDER BY day ASC
    `, [start, end], (err, rows) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
}

// Top productos con ganancia
exports.getTop = (req, res) => {
    const { start, end } = req.query;

    let dateFilter = "";
    let params = [];

    if (start && end) {
        dateFilter = " JOIN sales s ON s.id = si.sale_id WHERE date(s.created_at) BETWEEN date(?) AND date(?) ";
        params = [start, end];
    }

    db.all(`
        SELECT 
            p.name,
            SUM(si.quantity) AS quantity,
            SUM(si.quantity * si.price) AS revenue,
            SUM(si.quantity * p.price_input) AS cost,
            SUM(si.quantity * si.price) - SUM(si.quantity * p.price_input) AS profit
        FROM sale_items si
        JOIN product p 
            ON p.id = si.product_id
        ${dateFilter}
        GROUP BY p.id
        ORDER BY profit DESC
        LIMIT 5
    `, params, (err, rows) => {

        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
};

//detalles de la venta
exports.getSaleDetail = (req, res) => {

    const saleId = req.params.id;

    const saleQuery = `
        SELECT * FROM sales
        WHERE id = ?
    `;

    const itemsQuery = `
        SELECT 
            product.name,
            sale_items.quantity,
            sale_items.price
        FROM sale_items
        JOIN product 
            ON product.id = sale_items.product_id
        WHERE sale_items.sale_id = ?
    `;

    db.get(saleQuery, [saleId], (err, sale) => {

        if (err) {
            return res.status(500).json(err);
        }

        db.all(itemsQuery, [saleId], (err, items) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                sale: sale,
                items: items
            });

        });

    });

};

//Ventas por tipo de pago
exports.getSalesByType = (req, res) => {
    db.all(`
        SELECT 
            COALESCE(tipe_sale, 'sin tipo') AS tipe_sale,
            COUNT(*) AS totalSales,
            SUM(total) AS revenue,
            SUM(iva) AS iva,
            SUM(total_input) AS investment,
            SUM(total) - SUM(iva) - SUM(total_input) AS profit
        FROM sales
        WHERE strftime('%m', created_at, 'localtime') = strftime('%m', 'now', 'localtime')
        AND strftime('%Y', created_at, 'localtime') = strftime('%Y', 'now', 'localtime')
        GROUP BY tipe_sale
        ORDER BY revenue DESC
    `, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};
