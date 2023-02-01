import express from "express";
import adsController from "../controllers/adsController";

var multer = require('multer')
var upload = multer({ dest: './uploads/' })

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', adsController.index);
    router.get('/guest-ads', adsController.guest);

    router.get('/all-ads', adsController.getAllAds);
    router.get('/add-ads', adsController.addAds);    
    router.post('/create-ads', upload.single('image') , adsController.createAds);
    router.post('/create-ads-product', adsController.createAdsProduct);

    router.get('/edit-ads', adsController.editAds);
    router.post('/update-ads', upload.single('image') , adsController.updateAds);
    router.get('/delete-ads', adsController.deleteAds);

    router.post('/api/create-ads', adsController.createAdsApi);
    router.delete('/api/delete-ads', adsController.deleteAdsApi);
    router.put('/api/update-ads', adsController.updateAdsApi);
    router.get('/api/detail-ads', adsController.getDetailAdsApi);

    router.get('/api/all-ads', adsController.getAllAdsApi);
    // router.get('/api/current-ads', adsController.getCurrentAdsApi);


    return app.use("/", router);
}

module.exports = initWebRoutes;