'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
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
      expediteur: {
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
        type: Sequelize.INTEGER
      },
      contenu: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('texte', 'image', 'notification'),
        defaultValue : 'texte'
      },
      date_envoi: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Messages');
  }
};