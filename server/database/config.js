import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://localhost:27017/node_mongodb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the data");
  } catch (err) {
    console.log("Error when connecting to database", err);
  }
};

export default connectToDatabase;
