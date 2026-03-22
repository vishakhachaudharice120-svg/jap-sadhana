const mongoose = require('mongoose');

const RETRY_DELAY_MS = 5000;
const MAX_RETRIES = 5;

async function connectDB(uri) {
  let attempt = 0;
  while (attempt < MAX_RETRIES) {
    try {
      await mongoose.connect(uri);
      console.log("MongoDB connected on attempt " + (attempt + 1));
      return mongoose.connection;
    } catch (error) {
      attempt += 1;
      console.error("MongoDB connection failed (attempt " + attempt + "): " + error.message);
      if (attempt >= MAX_RETRIES) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
  throw new Error('Unable to connect to MongoDB');
}

module.exports = { connectDB };
