import express from "express";
import adsController from "../controllers/adsController";

var multer = require('multer')
var upload = multer({ dest: './src/public/uploads/' })

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/admin/get-all-ads', adsController.getAllAds);

    router.get('/admin/add-ads', adsController.addAds);    
    router.post('/admin/create-ads', upload.single('image') , adsController.createAds);
    router.post('/admin/create-ads-product', adsController.createAdsProduct);

    router.get('/admin/edit-ads', adsController.editAds);
    router.post('/admin/update-ads', upload.single('image') , adsController.updateAds);
    router.get('/admin/delete-ads', adsController.deleteAds);

    router.post('/api/create-ads', adsController.createAdsApi);
    router.get('/api/get-all-ads', adsController.getAllAdsApi);
    router.delete('/api/delete-ads', adsController.deleteAdsApi);
    router.put('/api/update-ads', adsController.updateAdsApi);
    router.get('/api/detail-ads', adsController.getDetailAdsApi);

    return app.use("/", router);
}

module.exports = initWebRoutes;