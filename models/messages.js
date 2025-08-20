'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Messages.belongsTo(models.Tontines, {
        foreignKey: "id_tontine", as: "tontine"
      });
      Messages.belongsTo(models.Users, {
        foreignKey: "expediteur", as: "user"
      });
    }
  }
  Messages.init({
    id_tontine: DataTypes.INTEGER,
    expediteur: DataTypes.INTEGER,
    contenu: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM('texte', 'image', 'notification'),
      defaultValue: 'texte'
    },
    date_envoi: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};