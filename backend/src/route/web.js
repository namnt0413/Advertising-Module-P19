import express from "express";
import adsController from "../controllers/adsController";


let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', adsController.getHomePage);

    router.post('/create-ads', adsController.createAds);
    router.get('/get-all-ads', adsController.getAllAds);
    router.delete('/delete-ads', adsController.deleteAds);
    router.put('/update-ads', adsController.updateAds);
    router.get('/detail-ads', adsController.getDetailAds);

    router.post('/api/create-ads', adsController.createAdsApi);
    router.get('/api/get-all-ads', adsController.getAllAdsApi);
    router.delete('/api/delete-ads', adsController.deleteAdsApi);
    router.put('/api/update-ads', adsController.updateAdsApi);
    router.get('/api/detail-ads', adsController.getDetailAdsApi);

    return app.use("/", router);
}

module.exports = initWebRoutes;