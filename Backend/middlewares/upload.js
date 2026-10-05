const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Usar UPLOADS_PATH pasado por main.js, o ruta local en desarrollo
const uploadsPath = process.env.UPLOADS_PATH || path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

module.exports = upload;