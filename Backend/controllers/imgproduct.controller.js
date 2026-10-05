const db = require("../database/db");
const fs = require("fs");
const path = require("path");

//====== obtener imagen de todos los productos
exports.getProducts = (req, res) => {
    db.all("SELECT * FROM product", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

exports.createImgProduct = (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ error: "Imagen requerida" });
        }

        const img = req.file.filename;

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