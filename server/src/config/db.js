const express = require("express");
const mongoose = require("mongoose");

const connectToDB = async () => {
  await mongoose
    .connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  connectToDB,
};
