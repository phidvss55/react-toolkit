// connect to mongoDB
var mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoDB = process.env.MONGO_URI + process.env.MONGO_DB;
    const conn = await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;