require("dotenv").config();
const express = require("express");
const connectDB = require("./shared/middlewares/connect-db");
const moviesRouter = require("./modules/movies/movie-route");
const usersRouter = require("./modules/users/users-route");
const reviewsRouter = require("./modules/reviews/reviews-route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB().then(() => {
  app.use("/api/movies", moviesRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/reviews", reviewsRouter);
  app.use((req, res) => res.status(404).json({ message: "Not found" }));
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
}).catch(err => {
  console.error("DB connection failed", err);
  process.exit(1);
});
