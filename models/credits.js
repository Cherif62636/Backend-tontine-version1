'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Credits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Credits.belongsTo(models.MembresTontines, {
        foreignKey: "id_membre", as: "membre"
      })
    }
  }
  Credits.init({
    id_membre: DataTypes.INTEGER,
    montant: DataTypes.INTEGER,
    interet: DataTypes.INTEGER,
    date_emprunt: DataTypes.DATE,
    date_remboursement: DataTypes.DATE,
    rembourse: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Credits',
  });
  return Credits;
};