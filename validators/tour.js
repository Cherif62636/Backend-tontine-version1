const Joi = require("joi");

const tourValidator = Joi.object({

    id_tontine: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "L'ID de la tontine doit être un nombre entier",
      "any.required": "L'ID de la tontine est obligatoire"
    }),
    id_membre: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "L'ID du membre doit être un nombre entier",
      "any.required": "L'ID du membre est obligatoire"
    }),
    
    date_prevue: Joi.date()
    .required()
    .messages({
        "date.base": "La date prevue doit être une date valide",
        "any.required": "La date prevue est obligatoire"
    }),
    date_versement: Joi.date()
    .required()
    .messages({
        "date.base": "La date du versement doit être une date valide",
        "any.required": "La date du versement est obligatoire"
    }),
    montant: Joi.number()
       .integer()
       .required()
       .messages({
         "number.base": "Le montant doit être un nombre entier",
         "any.required": "Le montant de la part est obligatoire",
    }),
    etat: Joi.string().valid('reçu' , 'en retard' , 'non reçu').optional().required().messages({
            "string.base" : "l'etat doit etre une chaine",
            "any.required" : "l'etat est requis",
            "any.only" : "l'etat doit être soit admin ou membre",
    }),
}); 
module.exports = tourValidator;

