const {Historique}=require('../models')
const validatorInscriptions=require('../validators/historiques')


// const addHistorique=async(req , res )=>{
//     try {
//         const data=req.body
//         await validatorInscriptions.validateAsync(req.body)

//     const historique=await Historique.create(data)
//     if(!historique)
//     {

//         return res.status(400).json({message:"Erreur survenu lors de l'enregistrement de l'historique"})
//     }
//     return res.status(201).json({message:"Enregistrement effectué avec succès"})

//     } catch (error) {
//         if(error.isJoi)
//         {
//             return res.status(400).json({
//                 message:error.details[0].message
//             })
//         }

//         console.log("Erreur",error)
//         res.status(500).json({message:"Erreur du serveur"})
        
//     }
// }

const displayAllHistorique=async( req, res)=>{
    try {
        const all_historique=await Historique.findAll()
        return res.status(201).json({message:"La liste des historiques est la suivante :",all_historique})
    } catch (error) {
        console.log("Erreur",error)
        return res.status(500).json({message:"Erreur du serveur"})
        
    }
}



module.exports={displayAllHistorique}