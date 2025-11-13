import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("✅ Successfully connected to the database");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // optional: stops the app if DB fails
  }
};

export default connectDb;
