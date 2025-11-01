const { Router } = require('express');
const moviesRoute = Router();
const MovieModel = require('./movies-model');

// GET /api/movies?search=&sortBy=releaseYear&order=desc&page=1&limit=10
moviesRoute.get('/', async (req, res, next) => {
  try {
    const { search, sortBy = 'title', order = 'asc', page = 1, limit = 10 } = req.query;
    const query = search ? { title: new RegExp(String(search), 'i') } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [data, total] = await Promise.all([
      MovieModel.find(query)
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(Number(limit)),
      MovieModel.countDocuments(query)
    ]);

    res.json({ data, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) { next(err); }
});

moviesRoute.get('/:id', async (req, res, next) => {
  try {
    const doc = await MovieModel.findById(req.params.id);
    if (!doc) { const e = new Error('Movie not found'); e.status = 404; throw e; }
    res.json(doc);
  } catch (err) { next(err); }
});

moviesRoute.post('/', async (req, res, next) => {
  try {
    const created = await MovieModel.create(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
});

moviesRoute.put('/:id', async (req, res, next) => {
  try {
    const updated = await MovieModel.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!updated) { const e = new Error('Movie not found'); e.status = 404; throw e; }
    res.json(updated);
  } catch (err) { next(err); }
});

moviesRoute.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await MovieModel.findByIdAndDelete(req.params.id);
    if (!deleted) { const e = new Error('Movie not found'); e.status = 404; throw e; }
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) { next(err); }
});

module.exports = { moviesRoute };
