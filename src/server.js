var express = require("express");
var appExpress = express();
var http = require("http").Server(appExpress);
var io = require("socket.io")(http);
const port = 888;

appExpress.use(express.static("public"));

io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("message", (message) => {
    socket.broadcast.emit("recive-message", message);
  });
});

http.listen(port, function () {
  console.log("listening on port" + port);
});
