require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { usersRoute }   = require('./modules/users/users-routes');
const { moviesRoute }  = require('./modules/movies/movies-routes');
const { reviewsRoute } = require('./modules/reviews/reviews-routes');

const connectDB = require('./shared/middlewares/connect-db');

const { authRoute } = require('./modules/auth/auth-routes');

const server   = express();
const port     = process.env.PORT || 3000;
const hostname = process.env.HOST || 'localhost';

// global middlewares
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// health
server.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// mount routes
server.use('/api/users', usersRoute);
server.use('/api/movies', moviesRoute);
server.use('/api/reviews', reviewsRoute);
server.use('/api/auth', authRoute);
server.use('/api/users', usersRoute);
server.use('/api/movies', moviesRoute);
server.use('/api/reviews', reviewsRoute);

// 404
server.use((req, res) => {
  res.status(404).send(`404! ${req.method} ${req.path} Not Found.`);
});

// error handler
server.use((err, req, res, next) => {
  console.error(err);
  let status  = err.status || 500;
  let message = err.message || 'Oops! Internal server error!';

  if (err.name === 'CastError') { status = 400; message = 'Invalid id format'; }
  if (err.name === 'ValidationError') { status = 400; message = err.message; }
  if (err.code === 11000) { status = 409; message = 'Duplicate key error'; }
  if (err.type === 'entity.parse.failed') { status = 400; message = 'Malformed JSON in request body'; }

  res.status(status).json({ message });
});

// start (connect DB first)
(async () => {
  try {
    await connectDB(); // requires MONGODB_URI
    server.listen(port, hostname, () => {
      console.log(`Server running on http://${hostname}:${port}`);
    });
  } catch (e) {
    console.error('Failed to start server:', e);
    process.exit(1);
  }
})();
