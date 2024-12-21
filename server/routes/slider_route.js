const express = require('express');
const  auth  = require('../middleware/auth');
const { uploadImage,uploadUpdateImage, allowedFormats } = require('../utils/multer');
const roles = require('../config/roles');
const sliderRouter = express.Router();

const { createSlider, getAllSlider,getSlider, updateSlider, deleteSlider } = require('../controllers/slider_controller');

sliderRouter.post('/create',auth([roles.USER,roles.ADMIN]), uploadImage(allowedFormats.IMAGE), createSlider);
sliderRouter.get('/allSliders',auth([roles.USER,roles.ADMIN]), getAllSlider);
sliderRouter.get('/:sliderId',auth([roles.USER,roles.ADMIN]), getSlider);
sliderRouter.put('/update/:SliderId',auth([roles.USER,roles.ADMIN]), uploadUpdateImage(allowedFormats.IMAGE), updateSlider);
sliderRouter.delete('/delete/:sliderId',auth([roles.USER,roles.ADMIN]), deleteSlider);

module.exports = sliderRouter;