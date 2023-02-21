

import db, { sequelize } from '../models/index';
require('dotenv').config();
import _, { result, toArray } from 'lodash';

let getAllAds = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let data = await db.Advertisement.findAll({
                attributes: {
                    exclude: ['createdAt','updatedAt']
                },
                order: [
                    ['id', 'DESC'],
                ]
            });
            resolve(data)

        } catch (error) {
            reject(error);
        }
    })
}

let getCurrentAds = () => {
    return new Promise( async (resolve, reject) => {
        const { Op } = require("sequelize");
        try {
            let data = await db.Advertisement.findAll({
                where: {
                    status: 1,
                    startedAt: { 
                        [Op.lte]: new Date() 
                    },
                    finishedAt: { 
                        [Op.gte]: new Date() 
                    }
                } ,
                include: [
                    { model: db.ads_product, as: 'adsData', attributes: ['product_id'] },
                ],
                raw: false,
                nest: true,
             });
            
            resolve(data)
            
        } catch (error) {
            reject(error);
        }
    })
}

let createAds = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !data.name || !data.content || !data.type || !data.startedAt || !data.finishedAt ) {
                resolve({
                    error_code: 1,
                    error_msg: 'Missing required parameter'
                });
            } else {
                await db.Advertisement.create({
                    name: data.name,
                    content: data.content,
                    type: data.type,
                    status: 0,
                    visitTime: 0,
                    image: data.image,
                    startedAt: data.startedAt,
                    finishedAt: data.finishedAt
                })
                let ads = await db.Advertisement.findOne({
                    order: [ [ 'id', 'DESC' ]],
                    });
                resolve({
                    data: ads,
                    error_code: 0,
                    error_msg: 'Create new advertisement successfully'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let createAdsProduct = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( data.type == 5) {
                let products = data.product
                let result = []
                products.map( item => {
                    let object = {};
                    object.ads_id = data.id;
                    object.product_id = item;
                    return result.push(object);
                })
                // console.log(result)
                if(products && products.length > 0){
                    await db.ads_product.bulkCreate(result);
                }  
            } else {
                await db.ads_product.create({
                    product_id: data.product,
                    ads_id: data.id
                });
            }

            resolve({
                error_code: 0,
                error_msg: 'Create products in advertisement successfully'
            })

        } catch (error) {
            reject(error);
        }
    })
}

let createAdsVoucher = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            await db.ads_voucher.create({
                voucher_id: data.voucher,
                ads_id: data.id
            });

            resolve({
                error_code: 0,
                error_msg: 'Create products in advertisement successfully'
            })

        } catch (error) {
            reject(error);
        }
    })
}

let deleteAds = (adsId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let advertisement = await db.Advertisement.findOne({
                where: { id : adsId }
            })
            if(!advertisement) {
                resolve({
                    error_code:2,
                    error_msg:`The advertisement isn't exist`
                })
            }

            await db.Advertisement.destroy({
                where: { id : adsId }
            })
            if(advertisement.type ==4 ) {
                await db.ads_voucher.destroy({
                    where: { ads_id : adsId }
                })
            } else {
                await db.ads_product.destroy({
                    where: { ads_id : adsId }
                })
            }
            resolve({
                error_code:0,
                error_msg:`The advertisement was deleted`
            })
            
        } catch (error) {
            reject(error);
        }
    })
}

let updateAds = (data) => {
    // console.log(data);
    return new Promise( async (resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    error_code:2,
                    error_msg: 'Missing required parameter'
                })
            }
            
            let advertisement = await db.Advertisement.findOne({ // where id = data.id
                where: { id : data.id},
                raw: false // tat hien thi object cua sequelize di
            })
            if( data.image === '' ) {
                data.image = advertisement.image ;
            }

            if( advertisement.type == 5 ){
                advertisement.name = data.name;
                advertisement.status = data.status;
                advertisement.image = data.image;
                advertisement.content = data.content;
                advertisement.startedAt = data.startedAt;
                advertisement.finishedAt = data.finishedAt;

                await advertisement.save(); // luu vao database , doc docs
                
                let products = data.product
                let result = []
                products.map( item => {
                    let object = {};
                    object.ads_id = data.id;
                    object.product_id = item;
                    return result.push(object);
                })
                // console.log(result)
                if(products && products.length > 0){
                    await db.ads_product.destroy({
                        where: { ads_id : data.id},
                    })
                    await db.ads_product.bulkCreate(result);
                }  

            } else if(advertisement.type == 4) {
                advertisement.name = data.name;
                advertisement.status = data.status;
                advertisement.image = data.image;
                advertisement.content = data.content;
                advertisement.startedAt = data.startedAt;
                advertisement.finishedAt = data.finishedAt;
                await advertisement.save(); // luu vao database , doc docs
                
                let adsVoucher = await db.ads_voucher.findOne({
                        where: { ads_id : data.id},
                        raw: false 
                })
                adsVoucher.voucher_id = data.voucher_id
                adsVoucher.save();
            } else {
               advertisement.name = data.name;
               advertisement.status = data.status;
               advertisement.image = data.image;
               advertisement.content = data.content;
               advertisement.startedAt = data.startedAt;
               advertisement.finishedAt = data.finishedAt;
               await advertisement.save(); // luu vao database , doc docs
               
               let adsProduct = await db.ads_product.findOne({
                    where: { ads_id : data.id},
                    raw: false 
               })
                adsProduct.product_id = data.product_id
                adsProduct.save();
            } 

            resolve({
                error_code: 0,
                error_msg: 'Update advertisement successfully'
            })
        } catch (e) {
            reject(e);
        }
    })
}

let editAds = (adsId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let ads = await db.Advertisement.findOne({  
                where:{ id : adsId},
                include: [
                    { model: db.ads_product, as: 'adsData', attributes: ['product_id'] },
                    { model: db.ads_voucher, as: 'adsVoucherData', attributes: ['voucher_id'] },
                ],
                raw: false,
                nest: true,

            })
            // console.log(ads.adsData)
            if(ads){
                resolve(ads);
            }
            else {
                resolve([]);
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllAds, getCurrentAds , createAds, createAdsProduct,  deleteAds, updateAds, editAds, createAdsVoucher
}