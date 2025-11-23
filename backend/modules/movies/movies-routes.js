const { Router } = require('express');
const moviesRoute = Router();
const MovieModel = require('./movies-model');

// GET /api/movies
moviesRoute.get('/', async (req, res, next) => {
  try {
    const { search, sortBy = 'title', order = 'asc', page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query = search ? { title: new RegExp(String(search), 'i') } : {};

    const [data, total] = await Promise.all([
      MovieModel.find(query)
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(Number(limit)),
      MovieModel.countDocuments(query)
    ]);

    res.json({
      data,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/movies/:id
moviesRoute.get('/:id', async (req, res, next) => {
  try {
    const doc = await MovieModel.findById(req.params.id);
    if (!doc) {
      const e = new Error('Movie not found');
      e.status = 404;
      throw e;
    }
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

// POST /api/movies
moviesRoute.post('/', async (req, res, next) => {
  try {
    const movie = new MovieModel({
      title: req.body.title,
      genre: req.body.genre,
      rating: req.body.rating,
      director: req.body.director,
      releaseYear: req.body.releaseYear,
      description: req.body.description,
    });

    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    next(err);
  }
});

// PUT /api/movies/:id
moviesRoute.put('/:id', async (req, res, next) => {
  try {
    const updateData = {
      title: req.body.title,
      genre: req.body.genre,
      rating: req.body.rating,
      director: req.body.director,
      releaseYear: req.body.releaseYear,
      description: req.body.description,
    };

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updated = await MovieModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      const e = new Error('Movie not found');
      e.status = 404;
      throw e;
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/movies/:id
moviesRoute.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await MovieModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      const e = new Error('Movie not found');
      e.status = 404;
      throw e;
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = { moviesRoute };
