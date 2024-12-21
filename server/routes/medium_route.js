const express = require('express');
const {uploadImage,uploadUpdateImage,allowedFormats} = require('../utils/multer')
const auth  = require('../middleware/auth');
const roles = require('../config/roles');

const mediumRouter = express.Router();

const { createMedium,getMedium, getAllMedium, updateMedium, deleteMedium } = require('../controllers/medium_controller');

mediumRouter.post('/create', auth([roles.USER,roles.ADMIN]), uploadImage(allowedFormats.IMAGE), createMedium);
mediumRouter.get('/allMediums', auth([roles.USER,roles.ADMIN]), getAllMedium);
mediumRouter.get('/:mediumId', auth([roles.USER,roles.ADMIN]), getMedium);
mediumRouter.put('/update/:mediumId', auth([roles.USER,roles.ADMIN]), uploadUpdateImage(allowedFormats.IMAGE), updateMedium);
mediumRouter.delete('/delete/:mediumId', auth([roles.USER,roles.ADMIN]), deleteMedium);

module.exports = mediumRouter;