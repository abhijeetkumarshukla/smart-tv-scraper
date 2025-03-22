const express = require("express");
const cors = require("cors");
const scrapeAmazonProduct = require("./scraper");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

app.post("/scrape", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const data = await scrapeAmazonProduct(url);
        res.json(data);
    } catch (error) {
        console.error("Scraping error:", error);
        res.status(500).json({ error: "Failed to scrape product details." });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
