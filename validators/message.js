const Joi = require("joi");

const validatorMessage = Joi.object({
    contenu: Joi.string().required().min(3).messages({
        "string.base" : "le contenu doit être une chaine de caractere",
        "any.required" : "le contenu est requis",
        "string.empty" : "le contenu ne doit pas etre vide",
        "string.min" : "le contenu doit comporter minimum 3 caracteres"
    }),
    date_envoi: Joi.date()
        .required()
        .messages({
            "date.base": "La date d'envoie doit être une date valide",
            "any.required": "La date d'envoie est obligatoire"
    }),
    id_tontine: Joi.number()
        .integer()
        .required()
        .messages({
          "number.base": "L'ID de la tontine doit être un nombre entier",
          "any.required": "L'ID de la tontine est obligatoire"
    }),
    expediteur: Joi.number()
        .integer()
        .required()
        .messages({
          "number.base": "L'expediteur doit être un nombre entier",
          "any.required": "L'expediteur est obligatoire"
    }),
     type: Joi.string()
        .valid('texte' , 'image' , 'notification')
        .default('texte')
        .optional()
        .messages({
            "any.only": "Le type doit être texte, image ou notification",
            "string.empty": "Le type ne peut pas être vide",
            "any.required": "Le type est obligatoire"
    }),
        

});


module.exports = validatorMessage;