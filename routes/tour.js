const express = require("express");
const { addTour, getTour, updateTour } = require("../controllers/tour");

const routeTour = express.Router();

routeTour.post("/add_tour", addTour);
routeTour.get("/list_tour",getTour,);
routeTour.post("/update_tour/:id", updateTour);

module.exports = routeTour;