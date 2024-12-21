const Router = require('express').Router;
const {getAdsSettings,getAppSettings,createAdsSettings,createAppSettings,updateAdsSettings,updateAppSettings} = require('../controllers/setting_controller');
const settingRoute = Router();



settingRoute.get('/ads/get',getAdsSettings);
settingRoute.post('/ads/create',createAdsSettings);
settingRoute.put('/ads/update',updateAdsSettings);