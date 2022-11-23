'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      // define association here
    }
  };

  History.init(
    {
      // id: DataTypes.STRING,
      patientId: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER,
      description: DataTypes.TEXT,

    },
    {
      sequelize,
      modelName: 'History',
    }
  );
  return History;
};