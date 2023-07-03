'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Utilisateur.belongsToMany(models.Foyer, {
        through: 'Utilisateurs_has_Foyers',
        foreignKey: 'idUtilisateur',
      });
    }
  }
  Utilisateur.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    role: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Utilisateur',
  });
  return Utilisateur;
};