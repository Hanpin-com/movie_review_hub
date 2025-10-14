const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const updateMovieRules = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("genre").optional().notEmpty().withMessage("Genre cannot be empty"),
  body("releaseYear")
    .optional()
    .isInt({ min: 1888 }).withMessage("Enter a valid year (1888 or later)"),
  checkValidation
];

module.exports = updateMovieRules;