import express from "express";
import adsController from "../controllers/adsController";


let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/get-all-ads', adsController.getAllAds);

    router.get('/add-ads', adsController.addAds);    
    router.post('/create-ads', adsController.createAds);
    router.get('/detail-ads', adsController.getDetailAds);
    router.post('/update-ads', adsController.updateAds);
    router.delete('/delete-ads', adsController.deleteAds);

    router.post('/api/create-ads', adsController.createAdsApi);
    router.get('/api/get-all-ads', adsController.getAllAdsApi);
    router.delete('/api/delete-ads', adsController.deleteAdsApi);
    router.put('/api/update-ads', adsController.updateAdsApi);
    router.get('/api/detail-ads', adsController.getDetailAdsApi);

    return app.use("/", router);
}

module.exports = initWebRoutes;