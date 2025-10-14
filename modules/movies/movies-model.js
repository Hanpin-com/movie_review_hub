const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  genre: { type: String, required: true },
  director: { type: String },
  releaseYear: { type: Number },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const MovieModel = mongoose.model("Movie", movieSchema);

async function getAllMovies() {
  return await MovieModel.find();
}

async function getMovieByID(id) {
  return await MovieModel.findById(id);
}

async function addNewMovie(movieData) {
  const movie = new MovieModel(movieData);
  return await movie.save();
}

async function updateExistingMovie(id, updateData) {
  return await MovieModel.findByIdAndUpdate(id, updateData, { new: true });
}

async function deleteMovie(id) {
  return await MovieModel.findByIdAndDelete(id);
}

module.exports = {
  getAllMovies,
  getMovieByID,
  addNewMovie,
  updateExistingMovie,
  deleteMovie
};
