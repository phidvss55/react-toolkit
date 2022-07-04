const express = require("express");
// import cors from "cors";
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/update", (req, res) => {
  res.status(200).json(req.body);
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
