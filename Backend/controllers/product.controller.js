const db = require("../database/db");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

//obtener datos de todos los productos

exports.getProducts = (req, res) => {
    db.all("SELECT * FROM product", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

//crear producto

exports.createProduct = (req, res) => {
    try {
        const { name, price_sale, price_input } = req.body;

        // La imagen es opcional
        const img = req.file ? req.file.filename : null;

        db.run(
            `INSERT INTO product (img, name, price_sale, price_input)
       VALUES (?,?,?,?)`,
            [img, name, price_sale, price_input],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ id: this.lastID });
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Modificar Producto
exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price_sale, price_input } = req.body;

    const newImg = req.file ? req.file.filename : null;

    // obtener imagen vieja
    db.get("SELECT img FROM product WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json(err);
        if (!row) return res.status(404).json({ message: "Producto no encontrado" });

        let sql;
        let params;

        // si hay nueva imagen -> borrar vieja
        if (newImg) {
            if (row.img) {
                const oldPath = path.join(__dirname, "../../uploads", row.img);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }

            sql = `
                UPDATE product 
                SET name=?, price_sale=?, price_input=?, img=? 
                WHERE id=?
            `;
            params = [name, price_sale, price_input, newImg, id];

        } else {
            // sin imagen nueva
            sql = `
                UPDATE product 
                SET name=?, price_sale=?, price_input=? 
                WHERE id=?
            `;
            params = [name, price_sale, price_input, id];
        }

        //  ejecutar update
        db.run(sql, params, function (err) {
            if (err) return res.status(500).json(err);

            res.json({ message: "Producto actualizado correctamente" });
        });
    });
};


//Borrar producto

exports.deleteProduct = (req, res) => {
    const { id } = req.params;

    // Obtener nombre de la imagen primero
    db.get("SELECT img FROM product WHERE id = ?", [id], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        //Borrar imagen física (si existe)
        if (row.img) {
            const imgPath = path.join(__dirname, "../uploads", row.img);

            console.log("Intentando borrar:", imgPath);

            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
                console.log("Imagen eliminada");
            } else {
                console.log("NO EXISTE LA IMAGEN");
            }
        }

        //Borrar registro de la imagen de la DB
        db.run("DELETE FROM product WHERE id = ?", [id], function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }

            res.json({ message: "Producto e imagen eliminados correctamente" });
        });
    });
};

//busqueda de productos por nombre

exports.searchProducts = (req, res) => {
    const { name } = req.query;

    db.all("SELECT * FROM product WHERE name LIKE ?", [`%${name}%`], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};


//exportar datos de archivo hoja de calculo a la base de datos

exports.importExcel = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const filePath = req.file.path;

        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        sheetData.forEach(product => {
            db.run(
                `INSERT INTO product (name, price_sale, price_input) VALUES (?, ?, ?)`,
                [
                    product.name,
                    Number(product.price_sale),
                    Number(product.price_input)
                ]
            );
        });

        fs.unlinkSync(filePath);

        res.json({ message: "Import successful" });

    } catch (error) {
        console.error("IMPORT ERROR:", error);
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};
