'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tontines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tontines.belongsTo(models.Users, {
        foreignKey: "leader_id", as: "user"
      });
      Tontines.hasMany(models.MembresTontines, {
        foreignKey: "id_tontine", as: "membre"
      });
      Tontines.hasMany(models.Invitations, {
        foreignKey: "id_tontine", as: "invitation"
      });
      Tontines.hasMany(models.Messages, {
        foreignKey: "id_tontine", as: "message"
      });
      Tontines.hasMany(models.Tour, {
        foreignKey: "id_tontine", as: "tour"
      });
    }
  }
  Tontines.init({
    nom: DataTypes.STRING,
    monmontant_part: DataTypes.INTEGER,
    frequence: {
      type: DataTypes.ENUM('journalier' , 'hebdomadaire', 'mensuel', 'annuel', 'autres'), 
      allowNull: false,
      defaultValue: "journalier"
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW 
    },
    date_fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    etat: {
      type: DataTypes.ENUM('actiif' , 'inactif'), 
      allowNull: false,
      defaultValue: "inactif"
    },
    leader_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tontines',
  });
  return Tontines;
};