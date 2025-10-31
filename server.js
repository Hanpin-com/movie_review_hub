require('dotenv').config();
const express = require('express');
const connectDB = require('./shared/middlewares/connect-db');

const { usersRoute }   = require('./modules/users/users-routes');
const { moviesRoute }  = require('./modules/movies/movies-routes');  
const { reviewsRoute } = require('./modules/reviews/reviews-routes'); 

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

server.use('/api/users', usersRoute);
server.use('/api/movies', moviesRoute);
server.use('/api/reviews', reviewsRoute);

server.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Oops! Internal server error!' });
});

server.use((req, res) => res.status(404).send(`404! ${req.method} ${req.path} Not Found.`));

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

(async () => {
  await connectDB();
  server.listen(port, host, err => {
    if (err) console.error(err.message);
    else console.log(`Server running on http://${host}:${port}`);
  });
})();
