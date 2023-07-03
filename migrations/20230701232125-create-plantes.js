'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plantes', {
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
      plante_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      specise: {
        allowNull: true,
        type: Sequelize.STRING
      },
      plante_picture: {
        allowNull: true,
        type: Sequelize.STRING
      },
      growth_time: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      light_time: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ideal_temperature: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ideal_humidity: {
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
    await queryInterface.dropTable('Plantes');
  }
};