const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  genre:       { type: String, required: true, trim: true },
  rating: { type: Number, min: 0, max: 10, default: null },
  director:    { type: String, default: '' },
  releaseYear: { type: Number, min: 1888, max: 2100 },
  description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
