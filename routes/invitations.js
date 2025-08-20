const express = require("express");
const { addInvitation, getInvitation, updateInvitation, acceptInvitation, refuseInvitation } = require("../controllers/invitations");


const routeInvitation = express.Router();

routeInvitation.post("/add_invitation", addInvitation);
routeInvitation.get("/list_invitation", getInvitation,);
routeInvitation.post("/update_invitation/:id", updateInvitation);
routeInvitation.post("/accept_invitation/:id", acceptInvitation);
routeInvitation.delete("/refuse_invitation/:id", refuseInvitation);


module.exports = routeInvitation;