const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const updateUserRules = [
  body("username").optional().notEmpty().withMessage("Username cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("password").optional().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  checkValidation
];

module.exports = updateUserRules;