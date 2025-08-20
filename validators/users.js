const Joi = require("joi");

const validatorUsers = Joi.object({
    nom: Joi.string().required().min(3).messages({
        "string.base" : "le nom doit être une chaine de caractere",
        "any.required" : "le nom est requis",
        "string.empty" : "le nom ne doit pas etre vide",
        "string.min" : "le nom doit comporter minimum 3 caracteres"
    }),
    telephone: Joi.string().required().min(9).messages({
        "string.base" : "le telephone doit etre une chaine",
        "any.required" : "le telephone est requis",
        "string.empty" : "le telephone ne doit pas etre vide",
        "string.min" : "le telephone doit comporter minimum 9 caracteres"
    }),
    role: Joi.string().valid('admin' , 'membre').optional().required().messages({
        "string.base" : "le role doit etre une chaine",
        "any.required" : "le role est requis",
        "any.only" : "le rôle doit être soit admin ou membre",
    }),
    langue: Joi.string().required().messages({
        "string.base" : "la langue doit etre une chaine",
        "any.required" : "la langue est requis",
        "string.empty" : "la langue ne doit pas etre vide",
        "string.min" : "la langue doit comporter minimum 3 caracteres"
    }),
    pin: Joi.string().required().messages({
        "string.base" : "le mot de passe doit etre une chaine",
        "any.required" : "le mot de passe est requis",
        "string.empty" : "le mot de passe ne doit pas etre vide",
        "string.min" : "le mot de passe doit comporter minimum 9 caracteres"
    }),
    photoProlil: Joi.string().optional()
});

module.exports = validatorUsers;