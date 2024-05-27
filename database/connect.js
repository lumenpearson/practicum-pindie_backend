const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/pindie";

async function connectToDatabase() {
    try {
        await mongoose.connect(DB_URL);
        console.log("Successfully connected to MongoDB");
    } catch (err) {
        console.log("An error occurred while connecting MongoDB");
        console.error(err);
    }
}

module.exports = connectToDatabase;
