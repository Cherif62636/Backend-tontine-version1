const express = require("express");
const middlewars = require("../middlewares/auth");
const { createTontine, getAllTontines, getTontineById, updateTontine, deleteTontine, lancerTontine, getTontineByUser } = require("../controllers/tontines");

const routeTontine = express.Router();

routeTontine.post("/add_tontine", createTontine);
routeTontine.get("/list_tontine",getAllTontines);
routeTontine.post("/update_tontine/:id", updateTontine);
routeTontine.post("/lancee_tontine/:id", lancerTontine);
routeTontine.get("/one_tontine/:id", getTontineById);
// routeTontine.get("/user_tontine/:leader_id", getTontineByUser);
routeTontine.delete("/delete_tontine/:id", deleteTontine);

module.exports = routeTontine;