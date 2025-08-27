const { Op, where } = require('sequelize');
const db = require('../models');
const tontineValidator = require('../validators/tontines');
const Tontines = db.Tontines;
const Users = db.Users;
const Historique = db.Historique;

exports.createTontine = async (req, res) => {
  try {
    await tontineValidator.validateAsync(req.body);

    const leaderId = req.body.leader_id;

    const user = await Users.findByPk(leaderId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Seuls les administrateurs peuvent créer une tontine" });
    }
    // const existe_leader_tontine = await Tontines.findOne({
    //   where: { leader_id: leaderId, etat: "actif"}
    // });

    // if (existe_leader_tontine) {
    //   return res.status(400).json({ message: "Vous avez déjà une tontine en cours" });
    // }
    const tontine = await Tontines.create({
      nom: req.body.nom,
      monmontant_part: req.body.monmontant_part,
      date_fin: req.body.date_fin,
      leader_id: leaderId
    });

    return res.status(201).json({ message: "Tontine créée avec succès", data: tontine });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getAllTontines = async (req, res) => {
  try {
    const list = await Tontines.findAll();

    res.status(200).json({ liste_tontine: list });
  } catch (err) {
    if (err.isJoi) {
      return res.status().json({ message: err.details[0].message })
    }
    console.log(err);

    res.status(500).json({ message: "Erreur du serveur" });
  }
};

exports.getTontineById = async (req, res) => {
  try {
    const tontine = await Tontines.findByPk(req.params.id);
    if (!tontine) return res.status(404).json({ error: 'Tontine introuvable' });
    res.status(200).json(tontine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTontine = async (req, res) => {
  try {
    await tontineValidator.validateAsync(req.body);

    const leaderId = req.body.leader_id;

    const user = await Users.findByPk(leaderId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Seuls les administrateurs peuvent modifier une tontine" });
    }

    // const existe_leader_tontine = await Tontines.findOne({
    //   where: { leader_id: leaderId, etat: "actif", id: {[Op.ne]: req.params.id}}
    // });

    // if (existe_leader_tontine) {
    //   return res.status(400).json({ message: "Ce leader a déjà une tontine en cours" });
    // }

    const updated = await Tontines.update(req.body, { where: { id: req.params.id } });
    if (updated[0] === 0) return res.status(404).json({ error: 'Tontine non trouvée' });
    res.status(200).json({ message: 'Mise à jour réussie', data: req.body });
  } catch (err) {
    res.status(400).json({ error: err.details ? err.details[0].message : err.message });
  }
};

exports.deleteTontine = async (req, res) => {
  try {
    const deleted = await Tontines.destroy({ where: { id: req.params.id } });
    if (deleted === 0) return res.status(404).json({ error: 'Tontine non trouvée' });
    res.status(200).json({ message: 'Tontine supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.lancerTontine = async (req, res) => {
  try {

    const id = req.params.id;

    const tontine = await Tontines.findByPk(id);
    if (!tontine) {
      return res.status(404).json({ message: "Tontine introuvable" });
    }

    const tontine_lancee = await Tontines.findOne({
      where: { etat: "actif", id: { [Op.eq]: id } }
    });

    if (tontine_lancee) {
      return res.status(400).json({ message: "Cette tontine est déjà en cours" });
    }

    await Historique.create({
      id_user: tontine.leader_id,
      type_action: "Tontine lancée",
      description: `Tontine #${tontine.id} lancée`,
      montant: 0,
      date_action: new Date()
    })

    tontine.etat = 'actif'
    tontine.date_debut = new Date()
    tontine.date_fin = req.body.date_fin
    await tontine.save();

    return res.status(200).json({ message: "Tontine lancée maintenant", data: tontine })

  } catch (err) {
    res.status(400).json({ error: err.details ? err.details[0].message : err.message });
  }
}

// exports.getTontineByUser = async (req, res) => {
//   try {
//     const user = await Users.findByPk(req.params.leader_id);
//     if (!user) return res.status(404).json({ error: 'User introuvable' });
//     await Tontines.findOne({where: {leader_id:{[Op.ne]:ne}}})
//     const tontines = await Tontines.findAll()
//     res.status(200).json(tontines);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };