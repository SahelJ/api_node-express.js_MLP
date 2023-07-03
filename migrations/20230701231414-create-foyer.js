'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Foyers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      banner: {
        allowNull: true,
        type: Sequelize.STRING
      },
      region: {
        allowNull: false,
        type: Sequelize.STRING
      },
      departement: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ville: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rue: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numero: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Foyers');
  }
};