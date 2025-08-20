const express = require("express");
const { addCotisation, getCotisation, validerCotisation, getCotisationById } = require("../controllers/cotisations");

const routeCotisation = express.Router();

routeCotisation.post("/add_cotisation", addCotisation);
routeCotisation.get("/list_cotisation",getCotisation,);
routeCotisation.post("/valide_cotisation/:id", validerCotisation);
routeCotisation.get("/one_cotisation/:id", getCotisationById);

module.exports = routeCotisation;