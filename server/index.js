import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import posts from "./routers/posts.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 4000;

const URI = "mongodb://localhost:27017/ninja_api";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" })); // limit data size client submit to server
app.use(cors());

app.use("/posts", posts);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
