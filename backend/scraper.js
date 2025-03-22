const puppeteer = require("puppeteer");

async function scrapeAmazonProduct(url) {
    const browser = await puppeteer.launch({
        headless: "new",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu"
        ],
    });

    const page = await browser.newPage();

    try {
        console.log("Navigating to:", url);
        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

        await page.waitForSelector("#productTitle", { timeout: 10000 });

        const productName = await page.$eval("#productTitle", el => el.textContent.trim());
        console.log("✅ Product Name:", productName);

        const price = await page.evaluate(() => {
            const priceEl = document.querySelector(".a-price-whole");
            return priceEl ? priceEl.innerText.trim() : "N/A";
        });

        const scrapedData = { productName, price };
        console.log("✅ Extracted Data:", scrapedData);

        await browser.close();
        return scrapedData;
    } catch (error) {
        console.error("Scraping error:", error);
        await browser.close();
        return { error: "Failed to scrape product details.", details: error.message };
    }
}

module.exports = scrapeAmazonProduct;
