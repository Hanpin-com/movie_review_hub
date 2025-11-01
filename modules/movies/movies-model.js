const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  genre: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  description: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);
