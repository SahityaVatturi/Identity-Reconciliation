const mongoose = require("mongoose");
mongoose.set("debug", true);

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
    };
    await mongoose.connect(process.env.MONGODB_KEY, options);
    console.log("Connected to MongoDB");
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected!");
    });
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected!");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error(error);
  }
};
module.exports = { connectDB };
