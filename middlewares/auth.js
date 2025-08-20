const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (req, res, next) =>{
    try {
        const headers = req.headers["authorization"];
        if (!headers || !headers.startsWith("Bearer ")) {
            return res.status(403).json({message: "Token manquant ou expiré"});
        }
        const token = headers.split(" ")[1];
        
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        req.user = decoded.user
        next()
    } catch (error) {
        console.log(error);
        return res.status(501).json({message: "Erreur lors de la recuperation du token"});
    }
}
  

module.exports = generateToken;