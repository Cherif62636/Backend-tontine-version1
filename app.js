const express = require("express");
const routeUser = require("./routes/users");
const routeTontine = require("./routes/tontines");
const routeMembre = require("./routes/membres");
const routeCotisation = require("./routes/cotisations");
const routeCredit = require("./routes/credits");
const routeTour = require("./routes/tour");
const routeInvitation = require("./routes/invitations");
const routeHistorique=require('./routes/historiques');
const routeMessage = require("./routes/message");
require('dotenv').config();

const app = express();
const port = process.env.PORT

app.use(express.json());
app.use("/user", routeUser);
app.use("/tontine", routeTontine);
app.use("/membre", routeMembre);
app.use("/cotisation", routeCotisation);
app.use("/credit", routeCredit);
app.use("/tour", routeTour);
app.use("/invitation", routeInvitation);
app.use('/historique',routeHistorique);
app.use('/message',routeMessage);

app.listen(port, () => {
    console.log("Le serveur a bien demararé sur le port: ", port);
})