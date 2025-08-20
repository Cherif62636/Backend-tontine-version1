const Joi = require("joi");

const valiatorInvitation = Joi.object({
    id_tontine: Joi.number()
        .integer()
        .required()
        .messages({
          "number.base": "L'ID de la tontine doit être un nombre entier",
          "any.required": "L'ID de la tontine est obligatoire"
    }),
    id_user: Joi.number()
        .integer()
        .required()
        .messages({
          "number.base": "L'ID user doit être un nombre entier",
          "any.required": "L'ID user tontine est obligatoire"
    }),
    telephone_invite:Joi.string().required().min(9).messages({
        "string.base" : "le telephone doit etre une chaine",
        "any.required" : "le telephone est requis",
        "string.empty" : "le telephone ne doit pas etre vide",
        "string.min" : "le telephone doit comporter minimum 9 caracteres"
    }),
    statut: Joi.string()
    .valid('accepter' , 'en attente' , 'refuser')
    .default('en attente')
    .optional()
    .messages({
        "any.only": "Le statut doit être accepter, en attente ou refuser",
        "string.empty": "Le statut ne peut pas être vide",
        "any.required": "Le statut est obligatoire"
    }),
         
});

module.exports = valiatorInvitation;