require("dotenv").config();
const express = require("express");
const cors = require("cors");
const scrapeAmazonProduct = require("./scraper");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/scrape", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const data = await scrapeAmazonProduct(url);
    res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
