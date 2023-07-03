'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cycles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Cycles.belongsTo(models.Serres, {
        foreignKey: {
          allowNull: false
        }
      })
      models.Cycles.belongsTo(models.Plantes, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  Cycles.init({
    state: DataTypes.BOOLEAN,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Cycles',
  });
  return Cycles;
};