const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const createMovieRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("genre").notEmpty().withMessage("Genre is required"),
  body("releaseYear")
    .optional()
    .isInt({ min: 1888 }).withMessage("Enter a valid year (1888 or later)"),
  checkValidation
];

module.exports = createMovieRules;