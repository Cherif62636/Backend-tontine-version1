'use strict';

const { defaultValueSchemable } = require('sequelize/lib/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MembresTontines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      id_tontine: {
        allowNull: false,
        references: {
          model:"Tontines",
          key: "id"
        },
        type: Sequelize.INTEGER
      },
      date_adhesion: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      ordre_tour: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('MembresTontines');
  }
};