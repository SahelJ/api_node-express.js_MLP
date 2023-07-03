'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Serres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Serres.belongsTo(models.Foyer, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  Serres.init({
    water_level: DataTypes.INTEGER,
    temperature: DataTypes.INTEGER,
    humidity: DataTypes.INTEGER,
    pump_state: DataTypes.BOOLEAN,
    fan_state: DataTypes.BOOLEAN,
    light_state: DataTypes.BOOLEAN,
    power_state: DataTypes.BOOLEAN,
    wifi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Serres',
  });
  return Serres;
};