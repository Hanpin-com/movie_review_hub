// const mongoose = require('mongoose');

// module.exports = async function connectDB() {
//   const uri = process.env.MONGODB_URI;
//   if (!uri) throw new Error('Missing MONGODB_URI in .env');
//   await mongoose.connect(uri);
// };

const mongoose = require("mongoose");

const DB_URL = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_NAME || "movie_review";

async function connectDB() {
  if (!DB_URL) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }

  try {
    await mongoose.connect(DB_URL, { dbName: DB_NAME });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Database connection failed", err);
    throw err; 
  }
}

module.exports = connectDB;
