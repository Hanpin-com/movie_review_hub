const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const createReviewRules = [
  body("movieId").notEmpty().withMessage("Movie ID is required"),
  body("userId").notEmpty().withMessage("User ID is required"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment cannot be empty"),
  checkValidation
];

module.exports = createReviewRules;
