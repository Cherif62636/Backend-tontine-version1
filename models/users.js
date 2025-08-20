'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Tontines, {
        foreignKey: "leader_id", as:"tontine"
      });
      Users.hasMany(models.Messages,{
        foreignKey: "expediteur", as: "message"
      });
      Users.hasMany(models.MembresTontines, {
        foreignKey:"id_user",  as: "membre"
      });
      Users.hasMany(models.Historique, {
        foreignKey: "id_user", as: "historique"
      });
      Users.hasMany(models.Invitations, {
        foreignKey: "id_user", as: "invitation"
      });
    }
  }

  Users.init({
    nom: DataTypes.STRING,
    telephone: DataTypes.STRING,
    pin: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM("admin", "membre"), // ✅ Correction ici
      allowNull: false,
      defaultValue: "membre"
    },
    langue: DataTypes.STRING,
    photoProlil: DataTypes.STRING // (petite faute ici : "photoProfil" peut-être ?)
  }, {
    sequelize,
    modelName: 'Users',
  });

  return Users;
};
