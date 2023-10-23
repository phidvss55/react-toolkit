import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const DATABASE_URL = process.env.DATABASE_URI;
    mongoose.set("strictQuery", false);
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the data");
  } catch (err) {
    console.log("Error when connecting to database", err);
  }
};

export default connectToDatabase;
