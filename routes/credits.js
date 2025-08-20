const express = require("express");
const { addCredit, getCredit, rembourseCredit } = require("../controllers/credits");
const middlewars = require("../middlewares/auth");

const routeCredit = express.Router();

routeCredit.post("/add_credit", addCredit);
routeCredit.get("/list_credit", getCredit,);
routeCredit.post("/rembourse_credit/:id", rembourseCredit);

module.exports = routeCredit;