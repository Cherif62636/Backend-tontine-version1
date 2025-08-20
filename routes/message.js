const express = require("express");
const { addMessage, getMessage, updateMessage } = require("../controllers/message");

const routeMessage = express.Router();

routeMessage.post("/add_message", addMessage);
routeMessage.get("/list_message",getMessage,);
routeMessage.post("/update_message/:id", updateMessage);

module.exports = routeMessage;