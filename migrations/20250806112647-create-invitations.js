'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invitations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_tontine: {
        allowNull: false,
        references: {
          model: "Tontines",
          key: "id"
        },
        type: Sequelize.INTEGER
      },
      id_user: {
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
        type: Sequelize.INTEGER
      },
      telephone_invite: {
        allowNull: false,
        type: Sequelize.STRING
      },
      statut: {
        allowNull: false,
        type: Sequelize.ENUM('accepter' , 'en attente' , 'refuser'),
        defaultValue: 'en attente'
      },
      date_invitation: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invitations');
  }
};