const express = require("express");
const app = express();
const socketio = require("socket.io");

let namespaces = require("./data/namespaces");
// console.log(namespaces);

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

//loop through each ns and listen for connection
namespaces.forEach((namespace) => {
  // console.log(namespace);
  io.of(namespace.endpoint).on("connection", (socket) => {
    console.log(`${socket.id} has joined ${namespace.endpoint}`);
  });
});
