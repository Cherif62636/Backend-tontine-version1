'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invitations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invitations.belongsTo(models.Tontines, {
        foreignKey: "id_tontine", as: "tontine"
      });
      Invitations.belongsTo(models.Users, {
        foreignKey: "id_user", as: "user"
      })
    }
  }
  Invitations.init({
    id_tontine: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    telephone_invite: DataTypes.STRING,
    statut: {
      type: DataTypes.ENUM('accepter' , 'en attente' , 'refuser'),
      allowNull: false,
      defaultValue: "en attente"
    },
    date_invitation:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Invitations',
  });
  return Invitations;
};