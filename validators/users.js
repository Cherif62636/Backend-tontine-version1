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
    role: Joi.string().valid('admin' , 'simple').default('simple').messages({
        "string.base" : "le role doit etre une chaine",
        "any.only" : "le rôle doit être soit admin ou simple",
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