import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';

let createAds = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !data.name || !data.content || !data.startedAt || !data.finishedAt ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
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
                    errCode: 0,
                    errMessage: 'Create new advertisement successfully'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    createAds, 
}