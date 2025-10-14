const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;

function connectDB(req, res, next) {
    try {
        mongoose.connect(dbUrl, { dbName: "MyOnlineShoppingDB" });
        console.log("Database connected!");
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send("Database connection failed!");
    }
}

module.exports = connectDB;