const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

const connectToDB = require("./config/db");

app.use(cors());
app.use(express.json());

connectToDB();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

// Socket connection
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    method: ["GET", "POST"],
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);

    // socket.join(userId);
    // socket.emit("welcome-msg", "Welcome to the chat!");
    // socket.broadcast.to();
  });

  socket.on("send-msg", (data) => {
    console.log("data", data);
    console.log("online user", onlineUsers);
    const sendUserSocket = onlineUsers.get(data.to);

    console.log("sendUserSocket", sendUserSocket);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
