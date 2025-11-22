const { body } = require("express-validator");

module.exports = [
  body("movieId")
    .notEmpty().withMessage("movieId is required")
    .isMongoId().withMessage("movieId must be a valid Mongo ObjectId"),
  body("userId")
    .notEmpty().withMessage("userId is required")
    .isMongoId().withMessage("userId must be a valid Mongo ObjectId"),
  body("rating")
    .notEmpty().withMessage("rating is required")
    .isInt({ min: 1, max: 5 }).withMessage("rating must be an integer 1–5"),
  body("comment")
    .notEmpty().withMessage("comment is required")
    .isLength({ min: 1 }).withMessage("comment cannot be empty"),
];
