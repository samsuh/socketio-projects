const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer);
io.on("connection", (socket) => {
  socket.emit("messageFromServer", { data: "Welcome to the socketio server" });
  socket.on("messageToServer", (dataFromClient) => {
    console.log(dataFromClient);
  });

  socket.join("level1");
  // socket.to goes to everyone but who's sending it, while io.of('/').to sends it from the entire server
  io.of("/")
    .to("level1")
    .emit("joined", `${socket.id} says I have joined the level 1 room!`);
  // socket.on("newMessageToServer", (msg) => {
  //   // console.log(msg);
  //   io.emit("messageToClients", { text: msg.text });
  // });
});

io.of("/admin").on("connection", (socket) => {
  console.log("Someone connected to the admin namespace!");
  io.of("/admin").emit("welcome", "Welcome to the admin channel!");
});
