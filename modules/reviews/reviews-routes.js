const express = require("express");
const { body, param, query, validationResult } = require("express-validator");
const Review = require("./models/review.model");
const Movie = require("../movies/models/movie.model");
const User = require("../users/models/user.model");

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post(
  "/",
  body("movieId").isMongoId(),
  body("userId").isMongoId(),
  body("comment").isString().notEmpty(),
  body("score").isFloat({ min: 0, max: 10 }),
  validate,
  async (req, res) => {
    try {
      const movie = await Movie.findById(req.body.movieId);
      if (!movie) return res.status(400).json({ message: "Invalid movieId" });
      const user = await User.findById(req.body.userId);
      if (!user) return res.status(400).json({ message: "Invalid userId" });
      const review = await Review.create(req.body);
      res.status(201).json(review);
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
      if (req.query.movieId) filter.movieId = req.query.movieId;
      if (req.query.userId) filter.userId = req.query.userId;
      if (req.query.minScore) filter.score = { ...(filter.score || {}), $gte: Number(req.query.minScore) };
      if (req.query.maxScore) filter.score = { ...(filter.score || {}), $lte: Number(req.query.maxScore) };
      let sort = { createdAt: -1 };
      if (req.query.sortBy) {
        const [field, order] = req.query.sortBy.split(":");
        sort = { [field]: order === "desc" ? -1 : 1 };
      }
      const total = await Review.countDocuments(filter);
      const reviews = await Review.find(filter).sort(sort).skip(skip).limit(limit).populate("userId", "username email").populate("movieId", "title genre").exec();
      res.json({ page, limit, totalPages: Math.ceil(total / limit), total, data: reviews });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get("/:id", param("id").isMongoId(), validate, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("userId", "username email").populate("movieId", "title");
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put(
  "/:id",
  param("id").isMongoId(),
  body("comment").optional().isString().notEmpty(),
  body("score").optional().isFloat({ min: 0, max: 10 }),
  validate,
  async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!review) return res.status(404).json({ message: "Review not found" });
      res.json(review);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.delete("/:id", param("id").isMongoId(), validate, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Deleted", id: review._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
