import db from '../models/index';
import adsService from '../services/adsService'

let index = (req, res) => {
    return res.render('index.ejs');
}

let guest = async (req, res) => {
    try {
        let data = await adsService.getCurrentAds();
        // console.log(data);
        return res.render('guest.ejs', {
            ads: data
        })
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
}


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
        req.body.image = req.file.firebaseUrl;
        let response = await adsService.createAds(req.body);
        return res.render('add_product.ejs', {
            ads: response.data
        })
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
}

let createAdsProduct = async (req, res) => {
    try {
        let response = await adsService.createAdsProduct(req.body);
        return res.status(200).json(response)
        // return res.render('add_product.ejs')
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
}

let deleteAds = async (req, res) => {
    try {
        let response = await adsService.deleteAds(req.query.id);
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
}

let editAds = async (req, res) => {
    
    let data = await adsService.editAds(req.query.id);
    // console.log((data))
    return res.render('edit.ejs', {
        ads: data
    }) 

}

let updateAds = async (req, res) => {
    try {
        ( req.file !== undefined ) ?
        ( req.body.image = req.file.firebaseUrl ) : (req.body.image = '');
        // return console.log(req.file);
        
        let data = req.body;
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
    index ,guest ,getAllAds, addAds , createAds , createAdsProduct,  deleteAds, updateAds , editAds ,
    createAdsApi , getAllAdsApi, deleteAdsApi, updateAdsApi, getDetailAdsApi
}
