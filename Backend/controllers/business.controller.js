const db = require("../database/db");

exports.getBusiness = (req, res) => {
    db.all("SELECT * FROM business", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

exports.updateBusiness = (req, res) => {
    const { id } = req.params;
    const { name_business } = req.body;

    const sql = `UPDATE business 
                    SET name_business=? 
                    WHERE id=?`;
    const params = [name_business, id];

    db.run(sql, params, function (err) {
        if (err) return res.status(500).json({ message: err.message });

        if (this.changes === 0) {
            return res.status(404).json({ message: "Error al realizar cambio" });
        }

        res.json({ message: "Nombre de negocio actualizado correctamente :D" });
    });
};