

import db, { sequelize } from '../models/index';
require('dotenv').config();
import _, { result } from 'lodash';

let getAllAds = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let data = await db.Advertisement.findAll({
                attributes: {
                    exclude: ['createdAt','updatedAt']
                }
            });
            resolve(data)

        } catch (error) {
            reject(error);
        }
    })
}

let getCurrentAds = () => {
    return new Promise( async (resolve, reject) => {
        const { QueryTypes } = require('sequelize');
        try {
            // let data = await db.Advertisement.findAll({
            //     where: sequelize.where( "finishedAt" , '>=', sequelize.fn('now'))
            //  });
             let data = await sequelize.query("SELECT * FROM `Advertisements` WHERE `finishedAt` > NOW()", {
                type: QueryTypes.SELECT
              });

            // const items = await table.findAll({
            //     where: Sequelize.where(Sequilize.literal('FROM_UNIXTIME(createdDate) + interval 6 hour'), '<=', Sequelize.fn('now'))
            //   })
            console.log(data)
            resolve(data)

        } catch (error) {
            reject(error);
        }
    })
}

let createAds = (data) => {
    return new Promise( async (resolve, reject) => {
        console.log(data);
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
    // console.log(data);
    return new Promise( async (resolve, reject) => {
        try {
            if( data.type == 4) {
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
            // await user.destroy(); khong sd duoc vi da config lai sequelize ra dang object raw o nodejs
            // con ham duoi chay duoc vi xoa truc tiep o db
            await db.Advertisement.destroy({
                where: { id : adsId }
            })
            await db.ads_product.destroy({
                where: { ads_id : adsId }
            })

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
            if( data.image !== '' ) {
                advertisement.image = data.image;
            }

            if( advertisement.type == 4 ){
                advertisement.name = data.name;
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

            } else {
               advertisement.name = data.name;
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



let createAdsApi = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !data.name || !data.content || !data.startedAt || !data.finishedAt ) {
                resolve({
                    error_code: 1,
                    error_msg: 'Missing required parameter'
                });
            } else {
                await db.Advertisement.create({
                    name: data.name,
                    content: data.content,
                    visitTime: 0,
                    startedAt: data.startedAt,
                    finishedAt: data.finishedAt
                })

                resolve({
                    error_code: 0,
                    error_msg: 'Create new advertisement successfully'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let getAllAdsApi = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let data = await db.Advertisement.findAll({
                attributes: {
                    exclude: ['createdAt','updatedAt']
                }
            });
            // if(data && data.length > 0) {
            //     data.map( item => {
            //         item.image = Buffer.from(item.image,'base64').toString('binary'); // convert image to base64
            //         return item;
            //     })
            // }
            // console.log(data);
            resolve({
                error_code: 0,
                error_msg: 'OK',
                data
            })

        } catch (error) {
            reject(error);
        }
    })
}

let deleteAdsApi = (adsId) => {
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
            // await user.destroy(); khong sd duoc vi da config lai sequelize ra dang object raw o nodejs
            // con ham duoi chay duoc vi xoa truc tiep o db
            await db.Advertisement.destroy({
                where: { id : adsId }
            })

            resolve({
                error_code:0,
                error_msg:`The advertisement was deleted`
            })
            
        } catch (error) {
            reject(error);
        }
    })
}

let updateAdsApi = (data) => {
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

           if( advertisement){
            advertisement.name = data.name;
            advertisement.content = data.content;
            advertisement.visitTime = data.visitTime;
            advertisement.startedAt = data.startedAt;
            advertisement.finishedAt = data.finishedAt;

            await advertisement.save(); // luu vao database , doc docs
                resolve({
                    error_code: 0,
                    error_msg: 'Update advertisement successfully'
                })
           }
           else{
                resolve({
                    error_code: 1,
                    error_msg: 'Update advertisement failed'
                });
           } 
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailAdsApi = (adsId) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !adsId ) {
                resolve({
                    error_code: 1,
                    error_msg: 'Missing required parameter',
                })
            } else {

                let data = await db.Advertisement.findOne({ 
                    where: { 
                        id : adsId 
                    },
                    attributes: {
                        exclude: ['createdAt','updatedAt']
                    }
                })
                // data.image = Buffer.from(data.image,'base64').toString('binary'); // convert image to base64
            
                resolve({
                    error_code: 0,
                    error_msg: 'OK',
                    data: data,
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    getAllAds, getCurrentAds , createAds, createAdsProduct,  deleteAds, updateAds, editAds,
    createAdsApi, getAllAdsApi, deleteAdsApi, updateAdsApi, getDetailAdsApi
}