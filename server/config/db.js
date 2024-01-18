import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const HOST = process.env.HOST || "mongodb://127.0.0.1:27017";
    const DB_NAME = process.env.DB_NAME || "mern_reservation_app";

    const FULL_URL = `${HOST}/${DB_NAME}`;
    console.log("FULL_URL", FULL_URL);

    await mongoose.connect(FULL_URL).then(() => {
      console.log("Database connected");
    });

    mongoose.connection.on("connected", () => {
      console.log("Database on connected");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected");
    });
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
