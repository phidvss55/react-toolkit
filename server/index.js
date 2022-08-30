const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./src/routes/auth");
const userRoute = require("./src/routes/user");
const cartRoute = require("./src/routes/cart");
const productRoute = require("./src/routes/product");
const orderRoute = require("./src/routes/order");
const paymentRoute = require("./src/routes/payment");

const { connectToDB } = require("./src/config/db");

dotenv.config();

// connect to the database
connectToDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", paymentRoute);

app.use("/", (req, res) => {
  res.status(200).send("Hello world");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
