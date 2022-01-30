const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Connection established", socket.id);
  socket.on("join_room", (data) => {
    cons;
  });
  socket.on("sendMsg", (data) => {
    console.log(socket.id, data);
    io.emit("recievedMsg", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected :", socket.id);
  });
});

server.listen(3000);
