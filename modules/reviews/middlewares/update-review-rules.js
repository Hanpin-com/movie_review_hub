const { body } = require("express-validator");

module.exports = [
  body("movieId")
    .optional()
    .isMongoId().withMessage("movieId must be a valid Mongo ObjectId"),
  body("userId")
    .optional()
    .isMongoId().withMessage("userId must be a valid Mongo ObjectId"),
  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage("rating must be an integer 1–5"),
  body("comment")
    .optional()
    .isLength({ min: 1 }).withMessage("comment cannot be empty"),
];
