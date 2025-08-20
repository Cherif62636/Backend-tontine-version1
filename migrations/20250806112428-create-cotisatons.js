'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cotisatons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_menbre: {
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
      date_paiement: {
        allowNull: false,
        type: Sequelize.DATE
      },
      statut: {
        allowNull: false,
        type: Sequelize.ENUM("en attente", "validée"),
        defaultValue: "en attente"
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
    await queryInterface.dropTable('Cotisatons');
  }
};