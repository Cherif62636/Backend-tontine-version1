'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telephone: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      pin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.ENUM('admin' , 'membre'),
        defaultValue: 'membre'
      },
      langue: {
        allowNull: false,
        type: Sequelize.STRING
      },
      photoProlil: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};