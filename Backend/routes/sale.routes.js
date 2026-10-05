const express = require("express");
const router = express.Router();
const saleController = require("../controllers/sale.controller");

router.post("/sale", saleController.createSale);
router.get("/sale", saleController.getSales);
router.get("/sale/month", saleController.getSalesMonth);
router.get("/sale/day", saleController.getSalesDay);
router.get("/sale/history", saleController.getSalesHistory);
router.get("/sale/range", saleController.getSalesByRange);
router.get("/sale/top", saleController.getTop);
router.get("/sale/report", saleController.getReportByDate);
router.get("/sale/type", saleController.getSalesByType);
router.get("/sale/:id", saleController.getSaleDetail);

module.exports = router;