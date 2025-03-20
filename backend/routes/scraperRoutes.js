const express = require("express");
const { scrapeAndSaveProduct, addProductManually } = require("../controllers/scraperController");

const router = express.Router();

// Scrape and save product
router.post("/scrape", scrapeAndSaveProduct);

// Add product manually
router.post("/products", addProductManually);

module.exports = router;