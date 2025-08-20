const express = require("express");

const { addMembre, getMembre, updateMembre } = require("../controllers/membres");

const routeMembre = express.Router();

routeMembre.post("/add_membre", addMembre);
routeMembre.get("/list_membre",getMembre,);
routeMembre.post("/update_membre/:id", updateMembre);

module.exports = routeMembre;