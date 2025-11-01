const { Router } = require("express");
const { body, param, query, validationResult } = require("express-validator");

const ReviewModel = require("./reviews-model"); 
const reviewsRoute = Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

/**
 * POST /api/reviews
 * body: { movieId(ObjectId), userId(ObjectId), rating(1-5), comment(string) }
 */
reviewsRoute.post(
  "/",
  body("movieId").isMongoId().withMessage("movieId must be a valid ObjectId"),
  body("userId").isMongoId().withMessage("userId must be a valid ObjectId"),
  body("comment").isString().notEmpty().withMessage("comment is required"),
  body("rating").isInt({ min: 1, max: 5 }).withMessage("rating must be 1–5"),
  validate,
  async (req, res, next) => {
    try {
      const created = await ReviewModel.create(req.body);
      res.status(201).json(created);
    } catch (err) { next(err); }
  }
);

/**
 * GET /api/reviews
 */
reviewsRoute.get(
  "/",
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
  validate,
  async (req, res, next) => {
    try {
      const {
        search,
        movieId,
        userId,
        minRating,
        maxRating,
        sortBy = "createdAt",
        order = "desc",
        page = 1,
        limit = 10
      } = req.query;

      const q = {};
      if (search) q.comment = new RegExp(String(search), "i");
      if (movieId) q.movieId = movieId;
      if (userId)  q.userId  = userId;

      if (minRating || maxRating) {
        q.rating = {};
        if (minRating) q.rating.$gte = Number(minRating);
        if (maxRating) q.rating.$lte = Number(maxRating);
      }

      const sort = { [sortBy]: String(order).toLowerCase() === "asc" ? 1 : -1 };
      const skip = (Number(page) - 1) * Number(limit);

      const [data, total] = await Promise.all([
        ReviewModel.find(q)
          .populate("userId",  "username email")
          .populate("movieId", "title genre")
          .sort(sort)
          .skip(skip)
          .limit(Number(limit)),
        ReviewModel.countDocuments(q),
      ]);

      res.json({
        data,
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      });
    } catch (err) { next(err); }
  }
);

/**
 * GET /api/reviews/:id
 */
reviewsRoute.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid review id"),
  validate,
  async (req, res, next) => {
    try {
      const doc = await ReviewModel.findById(req.params.id)
        .populate("userId",  "username email")
        .populate("movieId", "title genre");
      if (!doc) { const e = new Error("Review not found"); e.status = 404; throw e; }
      res.json(doc);
    } catch (err) { next(err); }
  }
);

/**
 * PUT /api/reviews/:id
 */
reviewsRoute.put(
  "/:id",
  param("id").isMongoId().withMessage("Invalid review id"),
  body("comment").optional().isString().notEmpty(),
  body("rating").optional().isInt({ min: 1, max: 5 }),
  validate,
  async (req, res, next) => {
    try {
      const updated = await ReviewModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updated) { const e = new Error("Review not found"); e.status = 404; throw e; }
      res.json(updated);
    } catch (err) { next(err); }
  }
);

/**
 * DELETE /api/reviews/:id
 */
reviewsRoute.delete(
  "/:id",
  param("id").isMongoId().withMessage("Invalid review id"),
  validate,
  async (req, res, next) => {
    try {
      const deleted = await ReviewModel.findByIdAndDelete(req.params.id);
      if (!deleted) { const e = new Error("Review not found"); e.status = 404; throw e; }
      res.json({ message: "Deleted", id: deleted._id });
    } catch (err) { next(err); }
  }
);

module.exports = { reviewsRoute }; 
