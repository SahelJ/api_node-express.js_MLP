'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Foyer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Foyer.belongsToMany(models.Utilisateur, {
        through: 'Utilisateurs_has_Foyers',
        foreignKey: 'idFoyer',
      });
    }
  } 
  Foyer.init({
    name: DataTypes.STRING,
    banner: DataTypes.STRING,
    region: DataTypes.STRING,
    departement: DataTypes.STRING,
    ville: DataTypes.STRING,
    rue: DataTypes.STRING,
    numero: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Foyer',
  });
  return Foyer;
};