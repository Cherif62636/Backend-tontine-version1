const Joi = require('joi');

const membreValidator = Joi.object({

    id_user: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "L'ID de l'utilisateur doit être un nombre entier",
      "any.required": "L'ID du l'utilisateur est obligatoire"
    }),

  id_tontine: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "L'ID de la tontine doit être un nombre entier",
      "any.required": "L'ID de la tontine est obligatoire"
    }),
    
    ordre_tour: Joi.number()
      .integer()
      .required()
      .messages({
        "number.base": "L'ordre de tour doit être un nombre entier",
        "any.required": "L'ordre de tour de la part est obligatoire",
      }),
});

module.exports = membreValidator 
