'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Utilisateurs_has_Foyers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUtilisateur: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Utilisateurs',
          key: 'id'
        }
      },
      idFoyer: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Foyers',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Utilisateurs_has_Foyers');
  }
};