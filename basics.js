const http = require("http");
const socketio = require("socket.io");

const server = http.createServer((req, res) => {
  res.end("I am connected!");
});

server.listen(8000);
