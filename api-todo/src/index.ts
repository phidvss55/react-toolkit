import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { todoRoutes } from "./routes/todos";
import { connectToDatabase } from "./db/db";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/", (req, res) => res.send("Hello from server!"));
app.use("/", todoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  connectToDatabase();
  console.log(`⚡Server is running here 👉 http://localhost:${PORT}`);
});
