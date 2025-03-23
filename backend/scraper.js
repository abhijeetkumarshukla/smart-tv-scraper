const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

async function scrapeAmazonProduct(url) {
    try {
        const browser = await puppeteer.launch({
            headless: "new",
            executablePath: "/usr/bin/google-chrome-stable",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "domcontentloaded" });

        const content = await page.content();
        const $ = cheerio.load(content);

        const productName = $("#productTitle").text().trim();
        const rating = $("span.a-icon-alt").first().text().trim();
        const numberOfRatings = $("#acrCustomerReviewText").text().trim();
        const price = $("#priceblock_ourprice, #priceblock_dealprice").text().trim();
        const discount = $(".priceBlockStrikePriceString").text().trim();
        const bankOffers = [];

        $(".a-list-item").each((_, el) => {
            bankOffers.push($(el).text().trim());
        });

        const aboutThisItem = [];
        $("#feature-bullets ul li").each((_, el) => {
            aboutThisItem.push($(el).text().trim());
        });

        const productInfo = {};
        $("#productDetails_techSpec_section_1 tr").each((_, el) => {
            const key = $(el).find("th").text().trim();
            const value = $(el).find("td").text().trim();
            if (key) productInfo[key] = value;
        });

        const productImages = [];
        $("#altImages img").each((_, el) => {
            const img = $(el).attr("src");
            if (img) productImages.push(img);
        });

        await browser.close();

        return {
            productName,
            rating,
            numberOfRatings,
            price,
            discount,
            bankOffers,
            aboutThisItem,
            productInfo,
            productImages,
        };
    } catch (error) {
        console.error("Scraping error:", error);
        return { error: "Failed to scrape product details." };
    }
}

module.exports = scrapeAmazonProduct;
