var express = require("express");
var app = express();
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());

var http = require("http");
var server = http.createServer(app);
var { Server } = require("socket.io");
var io = new Server(server, {
  cors: {
    origin: "*",
  },
});

var router = require("./routes/branch.routes");
app.use("/branches", router);

var routers = require("./routes/zonal.routes");
app.use("/zonals", routers);

var route = require("./routes/complaint.routes");
app.use("/complaints", route);

io.on("connection", (socket) => {
  socket.on("msg", (data) => {
    console.log("Msg from client", data);
  });
  socket.emit("welcome", "Welcome to edupoly");
});

server.listen(4600, () => {
  console.log("Server is running on 4600");
});
