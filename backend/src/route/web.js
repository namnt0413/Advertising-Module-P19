import express from "express";
import adsController from "../controllers/adsController";


let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', adsController.getHomePage);

    router.post('/api/create-ads', adsController.createAds);
    router.get('/api/get-all-ads', adsController.getAllAds);
    router.delete('/api/delete-ads', adsController.deleteAds);
    router.put('/api/update-ads', adsController.updateAds);
    router.get('/api/detail-ads', adsController.getDetailAds);

    return app.use("/", router);
}

module.exports = initWebRoutes;