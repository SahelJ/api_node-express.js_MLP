'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilisateurs_has_Foyers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Utilisateurs_has_Foyers.belongsTo(models.Utilisateur, {
        foreignKey: {
          allowNull: false
        }
      })
      models.Utilisateurs_has_Foyers.belongsTo(models.Foyer, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  Utilisateurs_has_Foyers.init({
    idUtilisateur: DataTypes.INTEGER,
    idFoyer: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Utilisateurs_has_Foyers',
  });
  return Utilisateurs_has_Foyers;
};