const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// FIX: Usar USER_DATA_PATH (pasado por main.js) para guardar la DB
// fuera del .asar, en una ruta con permisos de escritura.
// En desarrollo usa la ruta local del proyecto.
const userDataPath = process.env.USER_DATA_PATH || path.join(__dirname, "..");

// Asegurar que el directorio exista
if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true });
}

const dbPath = path.join(userDataPath, "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error al conectar SQLite:", err.message);
    } else {
        console.log("Conectado a SQLite en:", dbPath);
    }
});

module.exports = db;
