module.exports = updateReviewRules;

const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const updateReviewRules = [
  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("comment")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Comment cannot be empty if provided"),
  checkValidation
];

module.exports = updateReviewRules;
