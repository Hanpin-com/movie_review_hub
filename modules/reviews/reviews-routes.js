const { Router } = require("express");
const reviewsRoute = Router();
const ReviewModel = require("./reviews-model");
const createReviewRules = require("./middlewares/create-review-rules");
const updateReviewRules = require("./middlewares/update-review-rules");

// GET all reviews
reviewsRoute.get("/", async (req, res) => {
  try {
    const reviews = await ReviewModel.find();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

// GET specific review by ID
reviewsRoute.get("/:id", async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching review" });
  }
});

// POST create new review
reviewsRoute.post("/", createReviewRules, async (req, res) => {
  try {
    const newReview = new ReviewModel(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating review" });
  }
});

// PUT update review
reviewsRoute.put("/:id", updateReviewRules, async (req, res) => {
  try {
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) return res.status(404).json({ message: "Review not found" });
    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating review" });
  }
});

// DELETE review
reviewsRoute.delete("/:id", async (req, res) => {
  try {
    const deletedReview = await ReviewModel.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting review" });
  }
});

module.exports = { reviewsRoute };
