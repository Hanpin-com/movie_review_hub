const { Router } = require("express");
const moviesRoute = Router();

const createMovieRules = require("./middlewares/create-movies-rules");
const updateMovieRules = require("./middlewares/update-movies-rules");
const checkValidation = require("../../../shared/middlewares/check-validation");
const MovieModel = require("./movies-model");

// GET all movies
moviesRoute.get("/", async (req, res) => {
  try {
    const movies = await MovieModel.getAllMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies", error: err.message });
  }
});

// GET movie by ID
moviesRoute.get("/:id", async (req, res) => {
  try {
    const movie = await MovieModel.getMovieByID(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movie", error: err.message });
  }
});

// POST create new movie
moviesRoute.post("/", createMovieRules, checkValidation, async (req, res) => {
  try {
    const newMovie = await MovieModel.addNewMovie(req.body);
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ message: "Error creating movie", error: err.message });
  }
});

// PUT update movie
moviesRoute.put("/:id", updateMovieRules, checkValidation, async (req, res) => {
  try {
    const updatedMovie = await MovieModel.updateExistingMovie(req.params.id, req.body);
    if (!updatedMovie) return res.status(404).json({ message: "Movie not found" });
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: "Error updating movie", error: err.message });
  }
});

// DELETE movie
moviesRoute.delete("/:id", async (req, res) => {
  try {
    const deletedMovie = await MovieModel.deleteMovie(req.params.id);
    if (!deletedMovie) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting movie", error: err.message });
  }
});

module.exports = moviesRoute;
