'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tontines', {
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
      monmontant_part: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      frequence: {
        allowNull: false,
        type: Sequelize.ENUM('journalier' , 'hebdomadaire', 'mensuel'),
        defaultValue: 'journalier'
      },
      date_debut: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      etat: {
        allowNull: false,
        type: Sequelize.ENUM('actif' , 'inactif'),
        defaultValue: 'actif'
      },
      leader_id: {
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
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
    await queryInterface.dropTable('Tontines');
  }
};