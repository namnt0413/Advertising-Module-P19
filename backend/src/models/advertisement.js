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
      Advertisement.hasMany( models.ads_product, { foreignKey:'ads_id',as: 'adsData' } );

    }
  }
  Advertisement.init({
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    visitTime: DataTypes.INTEGER,
    image: DataTypes.STRING,
    type: DataTypes.INTEGER,
    startedAt: DataTypes.STRING,
    finishedAt: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Advertisement',
  });
  return Advertisement;
};