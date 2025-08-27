const Joi = require("joi");

const tontineValidator = Joi.object({

    nom: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.base": "Le nom doit être une chaîne de caractères",
      "string.empty": "Le nom ne peut pas être vide",
      "string.min": "Le nom doit contenir au moins 3 caractères",
      "any.required": "Le nom est obligatoire"
    }),

  monmontant_part: Joi.number()
    .integer()
    .required()
    .min(1000)
    .messages({
      "number.base": "Le montant doit être un nombre entier",
      "any.required": "Le montant de la part est obligatoire",
      "number.min" : "La somme minimale est de 1000"
    }),

  frequence: Joi.string()
    .valid('journalier' , 'hebdomadaire', 'mensuel', 'annuel', 'autres')
    .default('mensuel')
    .messages({
      "any.only": "La fréquence doit être 'journalier', 'hebdomadaire' ou 'mensuel'",
      "string.empty": "La fréquence ne peut pas être vide",
    }),

  date_fin: Joi.date()
    .required()
    .messages({
      "any.only": "La date fin d'une tontine doit etre valide",
      "string.empty": "La fréquence ne peut pas être vide",
      "any.required": "La fréquence est obligatoire"
    }),

  etat: Joi.string()
    .valid('actif', 'inactif')
    .optional()
    // .required()
    .default('inactif')
    .messages({
      "any.only": "L’état doit être actif ou inactif",
      "string.empty": "L’état ne peut pas être vide",
      // "any.required": "L’état est obligatoire"
    }),

  leader_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "L'ID du leader doit être un nombre entier",
      "any.required": "L'ID du leader est obligatoire"
    })
}); 
module.exports = tontineValidator;

