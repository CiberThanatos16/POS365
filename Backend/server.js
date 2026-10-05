process.env.TZ = 'America/Merida';
const express = require("express");
const cors = require("cors");
const path = require('path')
require("./database/init");

const productRoutes = require("./routes/product.routes");
const saleRoutes = require("./routes/sale.routes");
const businessRoutes = require("./routes/business.routes");
const resetRoutes = require("./routes/reset.routes");

const app = express();

const uploadsPath = process.env.UPLOADS_PATH || path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

app.use(cors());
app.use(express.json());

app.use("/api/pos365", productRoutes);
app.use("/api/pos365", saleRoutes);
app.use("/api/pos365", businessRoutes);
app.use("/api/pos365", resetRoutes);

app.get("/", (req, res) => {
  res.send("Servidor OK");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});


