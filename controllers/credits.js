const {Credits, MembresTontines} = require("../models");
const creditValidator = require("../validators/credits");


const addCredit = async(req, res) => {
    try {
        await creditValidator.validateAsync(req.boy);
        const {id_membre} = req.body
        const exist_membre = await MembresTontines.findByPk(id_membre);
        if (!exist_membre) {
            return res.status(403).json({message: "Membre introuvable"})
        }
        const one_credit = await Credits.create(req.body);
        return res.status(200).json({message: "Credit contracté avec succès", data: one_credit});
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

const getCredit = async(req, res) =>{
    try {
        const list_credit = await Credits.findAll();
        return res.status(200).json({ message:"La liste des credits" ,datas: list_credit});
    } catch (error) {
        console.log(error);
        return res.status(501).json({message: "Erreur du serveur"});
    }
}

let rembourseStore = {};
const rembourseCredit = async(req, res) => {
    try {
        await creditValidator.validateAsync(req.boy)
        const {interet, montant} = req.body;
        const id = Number(req.params.id);
        const credits = await Credits.findByPk(id);
        
        if (!credits) {
            return res.status(409).json({message: "aucun credit trouvé"});
        }

        rembourseStore[id] = {
            interet: interet,
            montan_total:interet + montant,
            date_rembourse: new Date()
        }

        credits.date_remboursement = new Date();
        credits.rembourse = true;

        await credits.save();
        return res.status(200).json({message: "credit remboursé avec succès", data: rembourseStore});
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

module.exports = {addCredit, getCredit, rembourseCredit}