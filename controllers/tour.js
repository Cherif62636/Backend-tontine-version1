const { Op } = require("sequelize");
const { Tour, MembresTontines, Tontines } = require("../models");
const tourValidator = require("../validators/tour");

const addTour = async (req, res) => {
    try {
        await tourValidator.validateAsync(req.boy);
        const { id_membre, id_tontine, num_tour } = req.body
        const membre = await MembresTontines.findByPk(id_membre);
        if (!membre) {
            return res.status(409).json({ message: "Ce membre n'existe pas" });
        }

        const tontine = await Tontines.findByPk(id_tontine);
        if (!tontine) {
            return res.status(409).json({ message: "Cette tontine n'existe pas" });
        }

        const existe_membre_tontine = await MembresTontines.findOne({ where: {id_tontine } });
        if (!existe_membre_tontine) {
            return res.status(409).json({ message: "Ce membre n'existe pas dans cette tontine" });
        }

        const verifie_tour = await Tour.findOne({ where: { num_tour: num_tour } });
        if (verifie_tour) {
            return res.status(409).json({ message: "Ce tour est déjà pris" });
        }
        const one_tour = await Tour.create(req.body);
        return res.status(200).json({ message: "Tour enregistré avec succès", data: one_tour });
    } catch (error) {
        if (error.isJoi) {
            return res.status(501).json({
                message: error.details[0].message
            })
        }
        console.log(error.message);
        return res.status(501).json({ message: error.details[0].message });
    }
}

const getTour = async (req, res) => {
    try {
        const list_tour = await Tour.findAll();
        return res.status(200).json({ message: "La liste des tours", datas: list_tour });
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Erreur du serveur" });
    }
}

const updateTour = async (req, res) => {
    try {
        await tourValidator.validateAsync(req.boy)

        const id = Number(req.params.id);
        const tours = await Tour.findByPk(id);

        const verifie_tour = await Tour.findOne({ where: { num_tour: req.body.num_tour, id: { [Op.ne]: id } } });
        if (verifie_tour) {
            return res.status(409).json({ message: "Ce tour est déjà pris" });
        }

        if (!tours) {
            return res.status(409).json({ message: "aucun tour trouvé" });
        }

        tours.id_membre = req.body.id_membre;
        tours.id_tontine = req.body.id_tontine;
        tours.num_tour = req.body.num_tour;
        tours.date_prevue = req.body.date_prevue;
        tours.date_versement = req.body.date_versement;
        tours.etat = req.body.etat;

        tours.save();
        return res.status(200).json({ message: "Tour modifié avec succès", data: tours });
    } catch (error) {
        if (error.isJoi) {
            return res.status(501).json({
                message: error.details[0].message
            })
        }
        console.log(error);
        return res.status(501).json({ message: "Erreur de serveur " });

    }
}

module.exports = { addTour, getTour, updateTour }