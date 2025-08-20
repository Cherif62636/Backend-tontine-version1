const express = require("express");
const { addUsers, getUser, updateUser, login, verifierOTP, envoyerOTP, restaurerMotDePasse } = require("../controllers/users");
const middlewars = require("../middlewares/auth");

const routeUser = express.Router();

routeUser.post("/add_user", addUsers);
routeUser.get("/list_user",getUser,);
routeUser.post("/update_user/:id", updateUser);
routeUser.post("/login", login);
routeUser.post("/envoie_otp", envoyerOTP);
routeUser.post("/verifier_otp", verifierOTP);
routeUser.post("/restaurer_pass", restaurerMotDePasse);

module.exports = routeUser;