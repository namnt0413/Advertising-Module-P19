import db from '../models/index';
import adsService from '../services/adsService'

let getAllAds = async (req, res) => {
    try {
        let data = await adsService.getAllAds();
        // console.log('-------------------------------------');
        // console.log(data);
        // console.log('-------------------------------------');
        return res.render('show.ejs', {
            adsProduct: data
        })
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
    // return res.render('homepage.ejs')
}

// crud ads 
let addAds = (req, res) => {
    return res.render('add.ejs'); // render
}

let createAds = async (req, res) => {
    try {
        let response = await adsService.createAds(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
    // return res.render('homepage.ejs')
}

let deleteAds = async (req, res) => {
    try {
        let response = await adsService.deleteAds(req.body.id);
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
}

let getDetailAds = async (req, res) => {
    
    let data = await adsService.getDetailAds(req.query.id);
    // console.log((data.adsData))
    return res.render('edit.ejs', {
        ads: data
    }) 

}

let updateAds = async (req, res) => {
    try {
        let data = req.body;
        // console.log(data)
        let response = await adsService.updateAds(data);
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
}



let createAdsApi = async (req, res) => {
    try {
        let response = await adsService.createAdsApi(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
    // return res.render('homepage.ejs')
}

let getAllAdsApi = async (req, res) => {
    try {
        let response = await adsService.getAllAdsApi();
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
    // return res.render('homepage.ejs')
}

let deleteAdsApi = async (req, res) => {
    try {
        let response = await adsService.deleteAdsApi(req.body.id);
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
}

let updateAdsApi = async (req, res) => {
    try {
        let data = req.body;
        // console.log(data)
        let response = await adsService.updateAdsApi(data);
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
}

let getDetailAdsApi = async (req, res) => {
    try {
        let response = await adsService.getDetailAdsApi(req.query.id);
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
    // return res.render('homepage.ejs')
}


module.exports = {
    getAllAds, addAds , createAds , deleteAds, updateAds , getDetailAds ,
    createAdsApi , getAllAdsApi, deleteAdsApi, updateAdsApi, getDetailAdsApi
}
