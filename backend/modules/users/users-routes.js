const { Router } = require('express');
const usersRoute = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUserRules = require('./middlewares/create-users-rules');
const updateUserRules = require('./middlewares/update-users-rules');
const checkValidation = require('../../shared/middlewares/check-validation');
const UserModel = require('./users-model');

const auth = require('../../shared/middlewares/auth');
const requireRole = require('../../shared/middlewares/require-role');

// POST /api/users/register
usersRoute.post(
  "/register",
  createUserRules,
  checkValidation,
  async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const exists = await UserModel.findOne({ email });
      if (exists) return res.status(400).json({ message: "Email already exists" });

      const hashed = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        username,
        email,
        password: hashed,
        role: "user",
      });

      res.status(201).json({ message: "Account created", userId: user._id });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/users/login
usersRoute.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
});


// GET /api/users  (admin only)
usersRoute.get('/', auth, requireRole(['admin']), async (req, res, next) => {
  try {
    const { search, sortBy = 'username', order = 'asc', page = 1, limit = 10 } = req.query;
    const q = search ? {
      $or: [
        { username: new RegExp(String(search), 'i') },
        { email:    new RegExp(String(search), 'i') }
      ]
    } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [data, total] = await Promise.all([
      UserModel.find(q)
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(Number(limit)),
      UserModel.countDocuments(q)
    ]);

    res.json({ data, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) { next(err); }
});

// GET /api/users/:id  (admin only)
usersRoute.get('/:id', auth, requireRole(['admin']), async (req, res, next) => {
  try {
    const doc = await UserModel.findById(req.params.id);
    if (!doc) { const e = new Error('User not found'); e.status = 404; throw e; }
    res.json(doc);
  } catch (err) { next(err); }
});

// PUT /api/users/:id  (admin only)
usersRoute.put('/:id', auth, requireRole(['admin']), updateUserRules, checkValidation, async (req, res, next) => {
  try {
    const updated = await UserModel.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updated) { const e = new Error('User not found'); e.status = 404; throw e; }
    res.json(updated);
  } catch (err) { next(err); }
});

// DELETE /api/users/:id  (admin only)
usersRoute.delete('/:id', auth, requireRole(['admin']), async (req, res, next) => {
  try {
    const deleted = await UserModel.findByIdAndDelete(req.params.id);
    if (!deleted) { const e = new Error('User not found'); e.status = 404; throw e; }
    res.json({ message: 'User deleted successfully' });
  } catch (err) { next(err); }
});

module.exports = { usersRoute };
