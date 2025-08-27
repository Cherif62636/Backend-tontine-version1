const { Op, where } = require("sequelize");
const db = require("../models");
const Users = db.Users;
const validatorUsers = require("../validators/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");


const hashPin =async (pass) => {
    const salt = await bcrypt.genSalt(10);
    const hashCodePin = await bcrypt.hash(pass, salt);
    return hashCodePin;
}

const addUsers = async(req, res) => {
    try {
        await validatorUsers.validateAsync(req.body);
        // return res.status(200).json({message: one_user});
        
        const verifie_tel = await Users.findOne({where: {telephone: req.body.telephone}});
        if (verifie_tel) {
            return res.status(409).json({message: "Ce telephone existe déjà"});
        }
        const {pin} = req.body
        req.body.pin = await hashPin(pin);

        const one_user = await Users.create(req.body);
        return res.status(200).json({message: "Utilisateur enregistré avec succès", data: one_user});
    } catch (error) {
        if (error.isJoi) {
            return res.status(501).json({
                message: error.details[0].message
            })
        }
        console.log(error);
        return res.status(501).json({message: "Erreur du serveur !!"});
    }
}

const getUser = async(req, res) =>{
    try {
        const list_user = await Users.findAll();
        return res.status(200).json(list_user);
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Erreur du serveur"});
    }
}

const updateUser = async(req, res) => {
    try {
        await validatorUsers.validateAsync(req.body);

        const id = Number(req.params.id);
        const user = await Users.findByPk(id);
        const verifie_tel = await Users.findOne({where: {telephone: req.body.telephone, id:{[Op.ne]:id}}});
        if (verifie_tel) {
            return res.status(409).json({message: "Ce telephone existe déjà"});
        }

        if (!user) {
            return res.status(409).json({message: "aucun utilisateur trouvé"});
        }
        const {pin} = req.body
        req.body.pin = await hashPin(pin);

        user.nom = req.body.nom;
        user.telephone = req.body.telephone;
        user.role = req.body.role;
        user.pin = req.body.pin;
        user.save();
        return res.status(200).json({message: "Utilisateur modifié avec succès", data: user});
    } catch (error) {
        console.log(error);
        return res.status(501).json({message: "Erreur de serveur"});
        
    }
}

const login = async(req, res) => {
    try {
        const {telephone, pin} = req.body;

        if (!telephone && !pin) {
            return res.status(409).json({message: "Informations de connexion requises"});
        }
        const recherche = await Users.findOne({where: {telephone: req.body.telephone}});
        if (!recherche) {
            return res.status(403).json({message: "Informations de connexion incorectes"});
        }
        const pass = await bcrypt.compare(pin, recherche.pin);
        if (!pass) {
            return res.status(403).json({message: "Informations de connexion incorectes"});
        }
        const token = jwt.sign({user:recherche}, process.env.JWT_TOKEN, {expiresIn: "5m"});
        return res.status(200).json({message: "Connexion reussi", token: token});
    } catch (error) {
        console.log(error);
        return res.status(501).json({message: "Erreur du serveur"});
    }
}

let otpStore = {};


const envoyerOTP = async (req, res) => {
    try {
        const { telephone } = req.body;
        const user = await Users.findOne({ where: { telephone } });
        if (!user) {
            return res.status(404).json({ message: "Numéro introuvable" });
        }
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        otpStore[telephone] = {
            otp,
            expiresAt: Date.now() + 3 * 60 * 1000 
        };
        console.log(`OTP pour ${telephone} : ${otp}`);
        return res.json({ message: "OTP envoyé", otp });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

const verifierOTP = async (req, res) => {
    try {
        const { telephone, otp } = req.body;

        const record = otpStore[telephone];
        if (!record) {
            return res.status(400).json({ message: "Aucun OTP trouvé" });
        }

        if (Date.now() > record.expiresAt) {
            delete otpStore[telephone];
            return res.status(400).json({ message: "OTP expiré" });
        }

        if (otp !== record.otp) {
            return res.status(400).json({ message: "OTP invalide" });
        }
        
        delete otpStore[telephone];

        return res.json({ message: "OTP validé, vous pouvez réinitialiser le mot de passe" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

const restaurerMotDePasse = async (req, res) => {
    try {
        const { telephone, nouveauPass } = req.body;

        const user = await Users.findOne({ where: { telephone } });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        user.pin = await hashPin(nouveauPass);
        await user.save();

        const token = jwt.sign(
            { id: user.id, telephone: user.telephone },
            process.env.JWT_TOKEN,
            { expiresIn: "5m" }
        );

        return res.status(200).json({
            message: "Mot de passe réinitialisé avec succès",
            token: token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur !!" });
    }
};


module.exports = {addUsers, getUser, updateUser, login,envoyerOTP,verifierOTP,restaurerMotDePasse }