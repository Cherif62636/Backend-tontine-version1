const { Op, NUMBER, where } = require("sequelize");
const { Invitations, Tontines, Users, Historique, MembresTontines } = require("../models");
const valiatorInvitation = require("../validators/invitations");


const addInvitation = async (req, res) => {
    try {
        await valiatorInvitation.validateAsync(req.body);

        const { id_tontine, id_user, telephone_invite } = req.body;

        // const invite_user = await Users.findOne({ where: { telephone: telephone_invite, id: { [Op.eq]: id_user } } });
        // if (!invite_user) {
        //     return res.status(409).json({
        //         message: "Cet user n'existe pas, impossible d'envoyer l'invitation"
        //     });
        // }

        const verifie_invite = await Invitations.findOne({ where: { id_user, id_tontine } });
        if (verifie_invite) {
            return res.status(409).json({
                message: "Cet user a déjà reçu une invitation provenant de cette tontine"
            });
        }

        const tontine = await Tontines.findByPk(id_tontine);
        if (!tontine) {
            return res.status(404).json({ message: "Cette tontine n'existe pas" })
        }

        // const inactiTontine = await Tontines.findOne({ where: { etat: "inactif" } });
        // if (inactiTontine) {
        //     return res.status(409).json({
        //         message: "Cette tontine ne peux envoyer d'invitation pour pour le moment car elle est inactive"
        //     });
        // }

        const one_invitation = await Invitations.create(req.body);
        return res.status(200).json({ message: "invitation envoyée avec succès", data: one_invitation });
    } catch (error) {
        if (error.isJoi) {
            return res.status(501).json({
                message: error.details[0].message
            })
        }
        console.log(error);
        return res.status(501).json({ message: "Erreur du serveur !!" });
    }
}

const getInvitation = async (req, res) => {
    try {
        const list_invitation = await Invitations.findAll();
        return res.status(200).json({ message: "La liste des invitations", datas: list_invitation });
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Erreur du serveur" });
    }
}

const updateInvitation = async (req, res) => {
    try {
        await valiatorInvitation.validateAsync(req.body)

        const id = Number(req.params.id);
        const invitations = await Invitations.findByPk(id);

        const verifie_tel = await Invitations.findOne({ where: { telephone_invite: req.body.telephone_invite, id: { [Op.ne]: id } } });
        if (verifie_tel) {
            return res.status(409).json({ message: "Ce telephone existe déjà" });
        }

        if (!invitations) {
            return res.status(409).json({ message: "aucune invitation trouvé" });
        }

        invitations.id_tontine = req.body.id_tontine;
        invitations.telephone_invite = req.body.telephone_invite;
        invitations.statut = req.body.statut
        // invitations.date_invitation = req.body.date_invitation;

        await invitations.save();
        return res.status(200).json({ message: "invitation modifié avec succès", data: invitations });
    } catch (error) {
        if (error.isJoi) {
            return res.status(501).json({
                message: error.details[0].message
            })
        }
        console.log(error);
        return res.status(501).json({ message: "Erreur de serveur" });

    }
}

const acceptInvitation = async (req, res) => {
    try {
        const id = req.params.id;
        const invitation = await Invitations.findByPk(id);
        if (!invitation) {
            return res.status(404).json({ message: "Invitation introuvable !" });
        }
        if (invitation.statut === "accepter") {
            return res.status(404).json({ message: "Invitation déjà acceptée !" });
        }

        await MembresTontines.create({
            id_user: invitation.id_user, 
            id_tontine: invitation.id_tontine,
            ordre_tour: 1, 
            date_adhesion: new Date()
        });

        await Historique.create({
            id_user: invitation.id_user,
            type_action: "Invitation_acceptée",
            description: `Invitation #${invitation.id} acceptée`,
            montant: 0,
            date_action: new Date()
        })

        invitation.statut = "accepter";
        await invitation.save();
        return res.status(200).json({ message: "invitation acceptée avec succès", invitation });

    } catch (error) {
        if (error.isJoi) {
            return res.status(501).json({
                message: error.details[0].message
            })
        }
        console.log(error);
        return res.status(501).json({ message: "Erreur de serveur" });

    }
}

const refuseInvitation = async (req, res) => {
    try {
        await valiatorInvitation.validateAsync(req.body);
        const id = req.params.id;
        const invitation = await Invitations.destroy({ where: { id: id } });

        if (invitation === 0) {
            return res.status(404).json({ message: "Invitation introuvable !!" })
        }

        return res.status(200).json({ message: "Invitation refusée !!" })
    } catch (error) {
        if (error.isJoi) {
            return res.status(501).json({
                message: error.details[0].message
            })
        }
        console.log(error);
        return res.status(501).json({ message: "Erreur de serveur" });

    }
}


module.exports = { addInvitation, getInvitation, updateInvitation, acceptInvitation, refuseInvitation }