'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Credits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      montant: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      interet: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      date_emprunt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      date_remboursement: {
        allowNull: false,
        type: Sequelize.DATE
      },
      rembourse: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
        
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
    await queryInterface.dropTable('Credits');
  }
};