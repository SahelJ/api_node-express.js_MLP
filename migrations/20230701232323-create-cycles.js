'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cycles', {
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
      idPlantes: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Plantes',
          key: 'id'
        }
      },
      idSerres: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Serres',
          key: 'id'
        }
      },
      state: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Cycles');
  }
};