const {Messages, Users, Tontines, Historique} = require("../models");
const validatorMessage = require("../validators/message");

const addMessage = async(req, res) => {
    try {
        await validatorMessage.validateAsync(req.boy);
        const {expediteur, id_tontine} = req.body;


        const user = await Users.findByPk(expediteur);
        if (!user) {
            return res.status(404).json({message: "Aucun utilisateur trouvé"});
        }
        const tontine = await Tontines.findByPk(id_tontine);
        if (!tontine) {
            return res.status(404).json({message: "Aucune tontine trouvée "});
        }

        await Historique.create({
            id_user: expediteur,
            type_action: "message_partagé",
            description: `message  partagé à tout le monde`,
            montant: 0,
            date_action: new Date()
        })

        const one_message = await Messages.create(req.body);
        return res.status(200).json({message: "Message envoyé a tout le monde", data: one_message});
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

const getMessage = async(req, res) =>{
    try {
        const list_message = await Messages.findAll();
        return res.status(200).json({ message:"La liste des messages" ,datas: list_message});
    } catch (error) {
        console.log(error);
        return res.status(501).json({message: "Erreur du serveur"});
    }
}

const updateMessage = async(req, res) => {
    try {
        await validatorMessage.validateAsync(req.boy)

        const id = Number(req.params.id);
        const messages = await Messages.findByPk(id);
        
        if (!messages) {
            return res.status(409).json({message: "aucun message trouvé"});
        }

        messages.id_tontine = req.body.id_tontine;
        messages.expediteur = req.body.expediteur;
        messages.contenu = req.body.contenu;
        messages.type = req.body.type;
        messages.date_envoi = req.body.date_envoi;

        await messages.save();
        return res.status(200).json({message: "Message modifié avec succès", data: messages});
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

module.exports = {addMessage, getMessage, updateMessage}