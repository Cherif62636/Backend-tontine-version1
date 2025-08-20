'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Historique extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Historique.belongsTo(models.Users, {
        foreignKey: "id_user", as: "user"
      });
    }
  }
  Historique.init({
    id_user: DataTypes.INTEGER,
    type_action: DataTypes.STRING,
    description: DataTypes.STRING,
    montant: DataTypes.INTEGER,
    date_action: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Historique',
  });
  return Historique;
};