const Joi = require("joi");

const cotisationValidator = Joi.object({

    id_menbre: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "L'ID du membre doit être un nombre entier",
      "any.required": "L'ID du membre est obligatoire"
    }),
    
    date_paiement: Joi.date()
    .required()
    .messages({
        "date.base": "La date du paiement doit être une date valide",
        "any.required": "La date du paiement est obligatoire"
    }),
    montant: Joi.number()
       .integer()
       .required()
       .messages({
         "number.base": "Le montant doit être un nombre entier",
         "any.required": "Le montant de la part est obligatoire",
    }),
    statut: Joi.string()
        .valid('en attente' , 'validée')
        .default('en attente')
        .optional()
        .messages({
            "any.only": "Le statut doit être en attente ou validée",
            "string.empty": "Le statut ne peut pas être vide",
            "any.required": "Le statut est obligatoire"
        }),
}); 
module.exports = cotisationValidator;