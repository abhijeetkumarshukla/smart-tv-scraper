const axios = require("axios");
const cheerio = require("cheerio");

const scrapeProduct = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const productName = $("#productTitle").text().trim();
    const rating = $(".a-icon-star .a-icon-alt").text().trim();
    const numberOfRatings = $("#acrCustomerReviewText").text().trim();
    const sellingPrice = $(".a-price-whole").text().trim();
    const totalDiscount = $(".savingsPercentage").text().trim();
    const bankOffers = $(".bank-offer").map((_, el) => $(el).text().trim()).get();
    const aboutThisItem = $("#feature-bullets ul li").map((_, el) => $(el).text().trim()).get();
    const productInformation = {};
    $(".prodDetTable tr").each((_, el) => {
      const key = $(el).find("th").text().trim();
      const value = $(el).find("td").text().trim();
      productInformation[key] = value;
    });
    const productImages = $(".imgTagWrapper img").map((_, el) => $(el).attr("src")).get();
    const manufacturerImages = $(".manufacturerImages img").map((_, el) => $(el).attr("src")).get();
    const aiGeneratedReviewSummary = $(".ai-review-summary").text().trim();

    return {
      productName,
      rating,
      numberOfRatings,
      sellingPrice,
      totalDiscount,
      bankOffers,
      aboutThisItem,
      productInformation,
      productImages,
      manufacturerImages,
      aiGeneratedReviewSummary,
    };
  } catch (error) {
    throw new Error("Scraping failed: " + error.message);
  }
};

module.exports = { scrapeProduct };