'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ads_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ads_product.belongsTo(models.Advertisement, {foreignKey: 'ads_id' , targetKey: 'id', as: 'adsData'})
      // ads_product.belongsTo(models.Product, {foreignKey: 'product_id' , targetKey: 'id', as: 'productData'})
    }
  }
  ads_product.init({
    ads_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ads_product',
  });
  return ads_product;
};