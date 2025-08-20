const express = require("express");

const historiqueController=require('../controllers/historiques')

const routeHistorique = express.Router();

routeHistorique.post("/add", historiqueController.addHistorique);
routeHistorique.get("/list_historique",historiqueController.displayAllHistorique,);


module.exports = routeHistorique;