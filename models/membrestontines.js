'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MembresTontines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MembresTontines.belongsTo(models.Users, {
        foreignKey: "id_user", as: "user"
      });
      MembresTontines.belongsTo(models.Tontines, {
        foreignKey: "id_tontine", as: "tontine"
      });
      MembresTontines.hasMany(models.Cotisatons, {
        foreignKey: "id_menbre" , as: "cotisation"
      });
      MembresTontines.hasMany(models.Tour, {
        foreignKey:"id_membre", as: "tour" 
      });
      MembresTontines.hasMany(models.Credits, {
        foreignKey: "id_membre", as: "credit"
      });
    }
  }
  MembresTontines.init({
    id_user: DataTypes.INTEGER,
    id_tontine: DataTypes.INTEGER,
    date_adhesion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    ordre_tour: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MembresTontines',
  });
  return MembresTontines;
};