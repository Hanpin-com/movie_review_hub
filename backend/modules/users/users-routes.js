const { Router } = require('express');
const usersRoute = Router();

const createUserRules = require('./middlewares/create-users-rules');
const updateUserRules = require('./middlewares/update-users-rules');
const checkValidation = require('../../shared/middlewares/check-validation');
const UserModel = require('./users-model');

const auth = require('../../shared/middlewares/auth');
const requireRole = require('../../shared/middlewares/require-role');

// POST /api/users  (public registration)
usersRoute.post('/', createUserRules, checkValidation, async (req, res, next) => {
  try {
    const payload = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 'user', 
    };

    const created = await UserModel.create(payload);
    res.status(201).json(created);
  } catch (err) {
    if (err.code === 11000) { 
      err.status = 409; 
      err.message = 'Duplicate username/email'; 
    }
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
