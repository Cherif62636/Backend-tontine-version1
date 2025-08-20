const express = require("express");
const middlewars = require("../middlewares/auth");
const { createTontine, getAllTontines, getTontineById, updateTontine, deleteTontine } = require("../controllers/tontines");

const routeTontine = express.Router();

routeTontine.post("/add_tontine", createTontine);
routeTontine.get("/list_tontine",getAllTontines);
routeTontine.post("/update_tontine/:id", updateTontine);
routeTontine.get("/one_tontine/:id", getTontineById);
routeTontine.delete("/delete_tontine/:id", deleteTontine);

module.exports = routeTontine;