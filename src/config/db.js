const mongoose = require("mongoose");
const config = require("./env");

module.exports = async function connectDB() {
    try {
        await mongoose.connect(config.dbUri);
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection failed");
        process.exit(1);
    }
};
