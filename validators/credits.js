const Joi = require("joi");

const creditValidator = Joi.object({
    id_membre: Joi.number()
    .integer()
    .required()
    .messages({
        "number.base": "L'ID du membre doit être un nombre entier",
        "any.required": "L'ID du membre est obligatoire"
    }),
    interet: Joi.number()
       .integer()
       .required()
       .messages({
         "number.base": "L'interet doit être un nombre entier",
         "any.required": "L'interet est obligatoire"
       }),
        
        date_emprunt: Joi.date()
        .required()
        .messages({
            "date.base": "La date d'emprunt doit être une date valide",
            "any.required": "La date d'emprunt est obligatoire"
        }),
        date_remboursement: Joi.date()
        .required()
        .messages({
            "date.base": "La date du remboursement doit être une date valide",
            "any.required": "La date du remboursement est obligatoire"
        }),
        montant: Joi.number()
           .integer()
           .required()
           .messages({
             "number.base": "Le montant doit être un nombre entier",
             "any.required": "Le montant de la part est obligatoire",
        }),
        rembourse: Joi.boolean().default(false)
});

module.exports = creditValidator;