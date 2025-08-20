const { Op, where } = require("sequelize");
const db = require("../models");
const membre = db.MembresTontines;
const users = db.Users;
const tontines = db.Tontines
const membreValidator = require("../validators/membres");

const addMembre = async(req, res) => {
    try {
        await membreValidator.validateAsync(req.body);

        const {id_user, id_tontine, ordre_tour} = req.body

        const user = await users.findByPk(id_user);
        if (!user) {
            return res.status(404).json({message: "Aucun utilisateur trouvé"});
        }
        const tontine = await tontines.findByPk(id_tontine);
        if (!tontine) {
            return res.status(404).json({message: "Aucune tontine trouvée "});
        }
        const exist_membre = await membre.findOne({where: {id_user,id_tontine}});
        if (exist_membre) {
            return res.status(409).json({message: "Ce membre existe dejà dans cette tontine"});
        }
        const exist_tour = await membre.findOne({where: {ordre_tour, id_tontine}});
        if (exist_tour) {
            return res.status(409).json({message: "Ce tour exite dejà dans cette tontine"});           
        }
        // const inactiTontine = await tontines.findOne({where: {etat: "inactif"}});
        // if (inactiTontine) {
        //     return res.status(409).json({
        //         message: "Cette tontine ne peux recevoir de membre pour le moment car elle est inactive"
        //     });           
        // }
        const one_membre = await membre.create(req.body);
        return res.status(200).json({
            message: "Membre enregitré avec succès dans cette tontine", data: one_membre
        });
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

const getMembre = async(req, res) =>{
    try {
        const list_membre = await membre.findAll();
        return res.status(200).json({ message:"La liste des membres" ,datas: list_membre});
    } catch (error) {
        console.log(error);
        return res.status(501).json({message: "Erreur du serveur"});
    }
}

const updateMembre = async(req, res) => {
    try {
        await membreValidator.validateAsync(req.body);

        const {id_user, id_tontine, ordre_tour} = req.body;
        const id = Number(req.params.id);

        const user = await users.findByPk(id_user);
        if (!user) {
            return res.status(404).json({message: "Aucun utilisateur trouvé"});
        }
        const tontine = await tontines.findByPk(id_tontine);
        if (!tontine) {
            return res.status(404).json({message: "Aucune tontine trouvée "});
        }
        const exist_membre = await membre.findOne({where: {id_user,id_tontine, id:{[Op.ne]:id}}});
        if (exist_membre) {
            return res.status(409).json({message: "Ce membre existe dejà dans cette tontine"});
        }
        const exist_tour = await membre.findOne({where: {ordre_tour, id_tontine, id:{[Op.ne]:id}}});
        if (exist_tour) {
            return res.status(409).json({message: "Ce tour exite dejà dans cette tontine"});           
        }
        const membres = await membre.findByPk(id);
        if (!membres) {
            return res.status(409).json({message: "aucun membre trouvé"});
        }
        // const inactiTontine = await tontines.findOne({where: {etat: "inactif"}});
        // if (inactiTontine) {
        //     return res.status(409).json({
        //         message: "Cette tontine ne peux recevoir de membre pour le moment car elle est inactive"
        //     });           
        // }

        membres.id_user = req.body.id_user;
        membres.id_tontine = req.body.id_tontine;
        membres.date_adhesion = req.body.date_adhesion;
        membres.ordre_tour = req.body.ordre_tour;

        await membres.save();
        return res.status(200).json({message: "Membre modifié avec succès", data: membres});
    } catch (error) {
         if (error.isJoi) {
            return res.status(501).json({
                message: error.details[0].message
            })
        }
        console.log(error);
        return res.status(501).json({message: "Erreur de serveur"});
        
    }
}

module.exports = {addMembre, getMembre, updateMembre}