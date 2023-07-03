'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plantes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Plantes.belongsTo(models.Foyer, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  Plantes.init({
    plante_name: DataTypes.STRING,
    specise: DataTypes.STRING,
    plante_picture: DataTypes.STRING,
    growth_time: DataTypes.INTEGER,
    light_time: DataTypes.INTEGER,
    ideal_temperature: DataTypes.INTEGER,
    ideal_humidity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Plantes',
  });
  return Plantes;
};