const express = require("express");
const { body, param, query, validationResult } = require("express-validator");
const User = require("./models/user.model");

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post(
  "/",
  body("username").isString().notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  validate,
  async (req, res) => {
    try {
      const exists = await User.findOne({ email: req.body.email });
      if (exists) return res.status(400).json({ message: "Email already in use" });
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get(
  "/",
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const filter = {};
      if (req.query.username) filter.username = { $regex: req.query.username, $options: "i" };
      if (req.query.email) filter.email = req.query.email;
      const total = await User.countDocuments(filter);
      const users = await User.find(filter).skip(skip).limit(limit).select("-password").exec();
      res.json({ page, limit, totalPages: Math.ceil(total / limit), total, data: users });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get("/:id", param("id").isMongoId(), validate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put(
  "/:id",
  param("id").isMongoId(),
  body("username").optional().isString().notEmpty(),
  body("email").optional().isEmail(),
  body("password").optional().isLength({ min: 6 }),
  validate,
  async (req, res) => {
    try {
      if (req.body.email) {
        const existing = await User.findOne({ email: req.body.email, _id: { $ne: req.params.id } });
        if (existing) return res.status(400).json({ message: "Email already in use" });
      }
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.delete("/:id", param("id").isMongoId(), validate, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Deleted", id: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
    }
});

module.exports = router;
