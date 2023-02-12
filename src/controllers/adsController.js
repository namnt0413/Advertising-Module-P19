import db from '../models/index';
import adsService from '../services/adsService'
import fetch from 'node-fetch';

let index = async (req, res) => {
    let data = await adsService.getAllAds();
    return res.render('index.ejs', {
        adsProduct: data
    })
}

let guest = async (req, res) => {
    try {
        const productsData = await fetch("https://p01-product-api-production.up.railway.app/api/products");
        const products = await productsData.json();
        console.log(products)

        let data = await adsService.getCurrentAds();
        // console.log(data);
        return res.render('guest.ejs', {
            ads: data,
            products: products.data
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

        const productsData = await fetch("https://p01-product-api-production.up.railway.app/api/products");
        const products = await productsData.json();
        console.log(products)
        
        return res.render('add_product.ejs', {
            ads: response.data,
            products: products.data
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
        let data = await adsService.getAllAds();
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
}

let deleteAds = async (req, res) => {
    try {
        let response = await adsService.deleteAds(req.query.id);
        let data = await adsService.getAllAds();
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
}

let editAds = async (req, res) => {

    let data = await adsService.editAds(req.query.id);
    const productsData = await fetch("https://p01-product-api-production.up.railway.app/api/products");
    const products = await productsData.json();
    // console.log(products)

    return res.render('edit.ejs', {
        ads: data,
        products: products.data
    }) 

}

let updateAds = async (req, res) => {
    try {
        ( req.file !== undefined ) ?
            ( req.body.image = req.file.firebaseUrl ) : (req.body.image = '');
        // return console.log(req.file);
        let data = req.body;
        let response = await adsService.updateAds(data);

        let adsProduct = await adsService.getAllAds();
        return res.render('show.ejs', {
            adsProduct: adsProduct
        })
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
}


let getCurrentAds = async (req, res) => {
    try {
        let response = await adsService.getCurrentAds();
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            error_code: -1,
            error_msg: 'Error from server'
        })
    }
}

module.exports = {
    index ,guest ,getAllAds, addAds , createAds , createAdsProduct,  deleteAds, updateAds , editAds ,
    getCurrentAds
}
