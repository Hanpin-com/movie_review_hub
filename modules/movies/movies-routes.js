const express = require("express");
const { body, param, query, validationResult } = require("express-validator");
const Movie = require("./models/movie.model");

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post(
  "/",
  body("title").isString().notEmpty(),
  body("genre").isString().notEmpty(),
  body("year").isInt({ min: 1800, max: 3000 }),
  body("rating").isFloat({ min: 0, max: 10 }),
  validate,
  async (req, res) => {
    try {
      const movie = await Movie.create(req.body);
      res.status(201).json(movie);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get(
  "/",
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const filter = {};
      if (req.query.title) filter.title = { $regex: req.query.title, $options: "i" };
      if (req.query.genre) filter.genre = req.query.genre;
      if (req.query.minRating) filter.rating = { ...(filter.rating || {}), $gte: Number(req.query.minRating) };
      if (req.query.maxRating) filter.rating = { ...(filter.rating || {}), $lte: Number(req.query.maxRating) };
      if (req.query.year) filter.year = Number(req.query.year);
      let sort = {};
      if (req.query.sortBy) {
        const [field, order] = req.query.sortBy.split(":");
        sort[field] = order === "desc" ? -1 : 1;
      } else {
        sort = { createdAt: -1 };
      }
      const total = await Movie.countDocuments(filter);
      const movies = await Movie.find(filter).sort(sort).skip(skip).limit(limit).exec();
      res.json({ page, limit, totalPages: Math.ceil(total / limit), total, data: movies });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get("/:id", param("id").isMongoId(), validate, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put(
  "/:id",
  param("id").isMongoId(),
  body("title").optional().isString().notEmpty(),
  body("genre").optional().isString().notEmpty(),
  body("year").optional().isInt({ min: 1800, max: 3000 }),
  body("rating").optional().isFloat({ min: 0, max: 10 }),
  validate,
  async (req, res) => {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!movie) return res.status(404).json({ message: "Movie not found" });
      res.json(movie);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.delete("/:id", param("id").isMongoId(), validate, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Deleted", id: movie._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
