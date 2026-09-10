const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!mongoUri) {
  console.error('FATAL: Missing MongoDB connection string. Set MONGODB_URI or MONGO_URI in environment.');
  process.exit(1);
}

const connectDB = async () => {
  try {
    // Recommended mongoose settings
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(mongoUri, {
      // useNewUrlParser and useUnifiedTopology are defaults in current mongoose versions
      // keeping explicit options for clarity
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // You can add other options here
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
