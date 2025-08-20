'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tours', {
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
      id_membre: {
        allowNull: false,
         references: {
          model: "MembresTontines",
          key: "id"
        },
        type: Sequelize.INTEGER
      },
      num_tour: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER
      },
      date_prevue: {
        allowNull: false,
        type: Sequelize.DATE
      },
      date_versement: {
        allowNull: false,
        type: Sequelize.DATE
      },
      etat: {
        allowNull: false,
        type: Sequelize.ENUM('reçu', 'en retard', 'non reçu'),
        defaultValue: "en retard"
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
    await queryInterface.dropTable('Tours');
  }
};