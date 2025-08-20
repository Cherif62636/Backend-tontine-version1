'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tour.belongsTo(models.Tontines, {
        foreignKey: "id_tontine",
        as: "tontine"
      });
      Tour.belongsTo(models.MembresTontines, {
        foreignKey: "id_membre",
        as: "membre"
      });
    }
  }
  Tour.init({
    id_tontine: DataTypes.INTEGER,
    id_membre: DataTypes.INTEGER,
    num_tour: DataTypes.INTEGER,
    date_prevue: DataTypes.DATE,
    date_versement: DataTypes.DATE,
    etat: {
      type: DataTypes.ENUM('reçu', 'en retard', 'non reçu'),
      defaultValue: "en retard"
    }
  }, {
    sequelize,
    modelName: 'Tour',
  });
  return Tour;
};