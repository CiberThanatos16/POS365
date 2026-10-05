const express = require("express");
const router = express.Router();
const db = require("../database/db");
const path = require("path");
const fs = require("fs");

// POST /api/pos360/reset
// Limpia todas las tablas y archivos de uploads.
// Solo se usa en desarrollo (llamado desde main.js de Electron).
router.post("/reset", (req, res) => {
    const tables = ["sale_items", "sales", "input", "product"];

    db.serialize(() => {
        // Deshabilitar foreign keys para poder borrar sin conflictos de orden
        db.run("PRAGMA foreign_keys = OFF");

        tables.forEach((table) => {
            db.run(`DELETE FROM ${table}`);
            db.run(`DELETE FROM sqlite_sequence WHERE name='${table}'`);
        });

        // Resetear el nombre del negocio
        db.run(`UPDATE business SET name_business = '' WHERE id = 1`);

        db.run("PRAGMA foreign_keys = ON", () => {
            // Borrar imágenes de uploads
            const uploadsPath =
                process.env.UPLOADS_PATH || path.join(__dirname, "..", "uploads");

            if (fs.existsSync(uploadsPath)) {
                fs.readdirSync(uploadsPath).forEach((file) => {
                    fs.rmSync(path.join(uploadsPath, file), { force: true });
                });
            }

            res.json({ success: true });
        });
    });
});

module.exports = router;
