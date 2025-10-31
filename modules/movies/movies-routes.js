const { Router } = require('express');
const Movie = require('./movies-model'); 
const moviesRoute = Router();

moviesRoute.get('/', async (req, res, next) => {
  try {
    const { search, sortBy = 'title', order = 'asc', page = 1, limit = 10 } = req.query;
    const query = search ? { title: new RegExp(search, 'i') } : {};

    const data = await Movie.find(query)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Movie.countDocuments(query);
    res.json({ data, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) { next(err); }
});

moviesRoute.get('/:id', async (req, res, next) => {
  try {
    const doc = await Movie.findById(req.params.id);
    if (!doc) { const e = new Error('Movie not found'); e.status = 404; throw e; }
    res.json(doc);
  } catch (err) { next(err); }
});

moviesRoute.post('/', async (req, res, next) => {
  try {
    const created = await Movie.create(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
});

moviesRoute.put('/:id', async (req, res, next) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) { const e = new Error('Movie not found'); e.status = 404; throw e; }
    res.json(updated);
  } catch (err) { next(err); }
});

moviesRoute.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) { const e = new Error('Movie not found'); e.status = 404; throw e; }
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) { next(err); }
});

module.exports = { moviesRoute };
