const { Router } = require("express");
const reviewsRoute = Router();
const ReviewModel = require("./reviews-model");

const createReviewRules = require("./middlewares/create-review-rules");
const updateReviewRules = require("./middlewares/update-review-rules");
const checkValidation   = require("../../shared/middlewares/check-validation"); 

reviewsRoute.get("/", async (req, res, next) => {
  try {
    const reviews = await ReviewModel.find();
    res.json(reviews);
  } catch (err) { next(err); }
});

reviewsRoute.get("/:id", async (req, res, next) => {
  try {
    const review = await ReviewModel.findById(req.params.id);
    if (!review) { const e = new Error("Review not found"); e.status = 404; throw e; }
    res.json(review);
  } catch (err) { next(err); }
});

reviewsRoute.post("/", createReviewRules, checkValidation, async (req, res, next) => {
  try {
    const newReview = await ReviewModel.create(req.body);
    res.status(201).json(newReview);
  } catch (err) { next(err); }
});

reviewsRoute.put("/:id", updateReviewRules, checkValidation, async (req, res, next) => {
  try {
    const updated = await ReviewModel.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!updated) { const e = new Error("Review not found"); e.status = 404; throw e; }
    res.json(updated);
  } catch (err) { next(err); }
});

reviewsRoute.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await ReviewModel.findByIdAndDelete(req.params.id);
    if (!deleted) { const e = new Error("Review not found"); e.status = 404; throw e; }
    res.json({ message: "Review deleted successfully" });
  } catch (err) { next(err); }
});

module.exports = { reviewsRoute };
