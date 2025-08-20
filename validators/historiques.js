const Joi = require("joi");

const validatorInscriptions = Joi.object({
    type_action: Joi.string().required().messages({
        "string.base" : "le nom doit être une chaine de caractere",
        "any.required" : "le nom est requis",
        "string.empty" : "le nom ne doit pas etre vide",
        "any.only":"Remplissez le champ avec l'une des suivantes valeurs photo ou texte"
        
    }),
    description: Joi.string().required().max(500).optional().messages({
        "string.base" : "La description doit etre une chaine",
        "any.required" : "La description est requise",
        "string.min" : "La description ne doit pas depasser 500 caracteres"
    }),
    montant: Joi.number().required().messages({
        "number.base" : "le role doit etre un nombre",
        "any.required" : "le role est requis"
        
    }),
  
    date_action:Joi.date().required().messages({
        "date.base" : "Le format de la date doit être valide",
        "date.empty":"La date ne doit pas être vide"
        
    }),
    id_user:Joi.number().integer().required().messages({
        "number.base":"L'ID user doit être un nombre",
        "number.integer":"L'id doit être in entier",
        "any.required":"L'id est requis",


    })
   
});

module.exports = validatorInscriptions;