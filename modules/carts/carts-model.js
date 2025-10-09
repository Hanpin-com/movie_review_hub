const mongoose = require("mongoose");

const CartProductSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  qty: { type: Number, min: 0, default: 0 },
  price: { type: Number, min: 0, default: 0 },
});

const cartSchema = new mongoose.Schema({
  subtotal: { type: Number, min: 0, default: 0 },
  hst: { type: Number, min: 0, default: 0 },
  total: { type: Number, min: 0, default: 0 },
});

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;
