const Router = require('express').Router;
const auth = require('../middleware/auth');
const roles = require('../config/roles');
const {getAdsSettings,getAppSettings,createAdsSettings,createAppSettings,updateAdsSettings,updateAppSettings} = require('../controllers/setting_controller');

const settingRoute = Router();


settingRoute.get('/ads',auth([roles.ADMIN]),getAdsSettings);
settingRoute.get('/app',auth([roles.ADMIN]),getAppSettings);
settingRoute.post('/ads/create',auth([roles.ADMIN]),createAdsSettings);
settingRoute.post('/app/create',auth([roles.ADMIN]),createAppSettings);
settingRoute.put('/ads/update/:settingId',auth([roles.ADMIN]),updateAdsSettings);
settingRoute.put('/app/update/:settingId',auth([roles.ADMIN]),updateAppSettings);



module.exports = settingRoute;