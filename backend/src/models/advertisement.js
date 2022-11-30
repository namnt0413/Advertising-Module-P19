'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Advertisement.init({
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    visitTime: DataTypes.INTEGER,
    image: DataTypes.STRING,
    type: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    startedAt: DataTypes.DATE,
    finishedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Advertisement',
  });
  return Advertisement;
};