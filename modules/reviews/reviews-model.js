const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  score: { type: Number, required: true, min: 0, max: 10 }
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
