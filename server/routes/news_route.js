const express = require('express');
const {uploadImage,uploadUpdateImage,allowedFormats} = require('../utils/multer')
const auth  = require('../middleware/auth');
const roles = require('../config/roles');

const newsRouter = express.Router()
const {createNews,getAllNews,getNews,updateNews,deleteNews,newsImageUpload,newsImageDelete,statusUpdate} = require('../controllers/news_controller');

newsRouter.post('/create',auth([roles.USER,roles.ADMIN]), uploadImage(allowedFormats.IMAGE), createNews);
newsRouter.get('/allNews',auth([roles.USER,roles.ADMIN]), getAllNews);
newsRouter.get('/:newsId',auth([roles.USER,roles.ADMIN]), getNews);
newsRouter.put('/update/:newsId',auth([roles.USER,roles.ADMIN]), uploadUpdateImage(allowedFormats.IMAGE), updateNews);
newsRouter.delete('/delete/:newsId',auth([roles.USER,roles.ADMIN]), deleteNews);
newsRouter.put('/updateStatus/:newsId',auth([roles.USER,roles.ADMIN]), statusUpdate);
newsRouter.post('/upload',auth([roles.USER,roles.ADMIN]), uploadImage(allowedFormats.IMAGE), newsImageUpload);
newsRouter.delete('/deleteImage',auth([roles.USER,roles.ADMIN]), newsImageDelete);
module.exports = newsRouter;