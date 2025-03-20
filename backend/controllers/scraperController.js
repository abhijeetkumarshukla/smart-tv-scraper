const { scrapeProduct } = require("../services/scraperService");
const Product = require("../models/Product");

// Scrape and save product
const scrapeAndSaveProduct = async (req, res) => {
  const { url } = req.body;
  try {
    const productData = await scrapeProduct(url);
    const product = new Product(productData);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new product manually
const addProductManually = async (req, res) => {
  const productData = req.body;
  try {
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { scrapeAndSaveProduct, addProductManually };