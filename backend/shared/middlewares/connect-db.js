// const mongoose = require('mongoose');

// module.exports = async function connectDB() {
//   const uri = process.env.MONGODB_URI;
//   if (!uri) throw new Error('Missing MONGODB_URI in .env');
//   await mongoose.connect(uri);
// };

const mongoose = require("mongoose");

const DB_URL = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_NAME;

async function connectDB(req, res, next) {
  try {
    await mongoose.connect(DB_URL, { dbName: DB_NAME });
    console.log("Database Connected");
    next();
  } catch (error) {
    console.log(`Database connection failed`);
    console.log(error);
  }
}

module.exports = connectDB;
