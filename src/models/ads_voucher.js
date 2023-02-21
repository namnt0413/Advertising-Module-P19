'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ads_voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ads_voucher.belongsTo(models.Advertisement, {foreignKey: 'ads_id' , targetKey: 'id', as: 'adsVoucherData'})
    }
  }
  ads_voucher.init({
    ads_id: DataTypes.INTEGER,
    voucher_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ads_voucher',
  });
  return ads_voucher;
};