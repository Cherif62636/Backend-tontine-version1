const { Cotisatons, MembresTontines, Historique } = require("../models");
const cotisationValidator = require("../validators/cotisations");

const addCotisation = async (req, res) => {
    try {
        await cotisationValidator.validateAsync(req.boy);
        const { id_menbre } = req.body;

        const membre = await MembresTontines.findByPk(id_menbre);
        if (!membre) {
            return res.status(409).json({ message: "Ce membre n'existe pas" });
        }

        const one_cotisation = await Cotisatons.create(req.body);
        return res.status(200).json({ message: "Cotisation enregistré avec succès", data: one_cotisation });
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

const getCotisation = async (req, res) => {
    try {
        const list_Cotisation = await Cotisatons.findAll();
        return res.status(200).json({ message: "La liste des Cotisations", datas: list_Cotisation });
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Erreur du serveur" });
    }
}

const getCotisationById = async (req, res) => {
    try {
        let idCota = Number(req.params.id);
        const cota = await Cotisatons.findByPk(idCota);
        if (!cota) {
            return res.status(404).json({ message: "Cotisation introuvable" });
        }
        return res.status(200).json({ message: `Les information sur la ${(idCota) == 1 ? `${idCota} ere` : `${idCota} ème`}  cotisation`, cota })
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Erreur du serveur !!" });
    }
}

const validerCotisation = async (req, res) => {
    try {
        const id = req.params.id;
        const cotisation = await Cotisatons.findByPk(id);
        if (!cotisation) {
            return res.status(404).json({ message: "Cette cotisation n'existe pas" })
        }
        if (cotisation.statut === "validée") {
            return res.status(409).json({ message: "Cotisation déjà validée !! ",})
        }
        await Historique.create({
            id_user: cotisation.id_menbre,
            type_action: "cotisation_validee",
            description: `Cotisation #${cotisation.id} validée`,
            montant: cotisation.montant,
            date_action: new Date()
        });
        cotisation.statut = "validée";
        cotisation.date_paiement = new Date();
        await cotisation.save();
        return res.status(200).json({ messag: "Cotisation validée avec succès", data: cotisation });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
}

module.exports = { addCotisation, getCotisation, getCotisationById, validerCotisation } 