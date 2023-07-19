const mongoose = require("mongoose");
const data = require("../products/Products");
let schema = new mongoose.Schema({
  qty: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    // unique: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  trending: {
    type: Boolean,
    required: false,
  },
});

let Products = mongoose.model("lens", schema);
module.exports = { Products };
