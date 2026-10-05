const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const upload = require("../middlewares/upload");

router.get("/", productController.getProducts);

router.post("/", upload.single("img"), productController.createProduct);

router.put("/:id", upload.single("img"), productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

router.get("/search", productController.searchProducts);

router.post("/import", upload.single("file"), productController.importExcel);




module.exports = router;
