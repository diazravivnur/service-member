'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    Phone_number: DataTypes.STRING,
    Country: DataTypes.STRING,
    Code_Country: DataTypes.STRING,
    Type_user: DataTypes.STRING,
    Photo: DataTypes.STRING,
    Status_user: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};