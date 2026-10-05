const express = require("express");
const router = express.Router();

const businessController = require("../controllers/business.controller");

router.get("/business", businessController.getBusiness);

router.put("/business/:id", businessController.updateBusiness);

module.exports = router;