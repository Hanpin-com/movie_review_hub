const { body } = require("express-validator");

module.exports = [
  body("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email is required"),
  body("password")
    .optional()
    .isLength({ min: 6 }) 
    .withMessage("Password must be at least 6 characters long"),
];
