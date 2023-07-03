'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Serres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idFoyer: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Foyers',
          key: 'id'
        }
      },
      water_level: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      temperature: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      humidity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      pump_state: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      fan_state: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      light_state: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      power_state: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      wifi: {
        allowNull: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Serres');
  }
};