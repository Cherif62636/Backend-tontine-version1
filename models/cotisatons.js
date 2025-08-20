'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cotisatons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Cotisatons.belongsTo(models.MembresTontines, {
        foreignKey: "id_menbre", as: "membre"
      })
    }
  }
  Cotisatons.init({
    id_menbre: DataTypes.INTEGER,
    montant: DataTypes.INTEGER,
    date_paiement: DataTypes.DATE,
    statut:{
      type: DataTypes.ENUM("en attente", "validée"),
      defaultValue: "En attente"
    }
  }, {
    sequelize,
    modelName: 'Cotisatons',
  });
  return Cotisatons;
};