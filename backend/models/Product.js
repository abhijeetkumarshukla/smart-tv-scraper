const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: String,
  rating: String,
  numberOfRatings: String,
  sellingPrice: String,
  totalDiscount: String,
  bankOffers: [String],
  aboutThisItem: [String],
  productInformation: Object,
  productImages: [String],
  manufacturerImages: [String],
  aiGeneratedReviewSummary: String,
});

module.exports = mongoose.model("Product", productSchema);