const express = require("express");
const handler = require("./httpHandler");
const trackerController = require("./trackerController");

const server = express();

server.use("/client", express.static("./jquery-mockup"));
server.use("/old", handler.main);
server.use("/trackerEntry", trackerController.router);

server.listen(8080);

console.log("http://localhost:8080");