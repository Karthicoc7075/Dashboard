const express = require('express');
const {uploadImageandFile, uploadImage,allowedFormats} = require('../utils/multer');
const auth  = require('../middleware/auth');
const roles = require('../config/roles');

const materialRouter = express.Router();

const {createMaterial, getAllMaterials,getMaterial,  updateMaterial, deleteMaterial,updateStatus} = require('../controllers/material_controller');


materialRouter.post('/create', auth([roles.USER,roles.ADMIN]), uploadImageandFile(), createMaterial);
materialRouter.get('/allMaterials', auth([roles.USER,roles.ADMIN]), getAllMaterials);
materialRouter.get('/getMaterial/:materialId', auth([roles.USER,roles.ADMIN]), getMaterial);
materialRouter.put('/update/:materialId', auth([roles.USER,roles.ADMIN]), uploadImageandFile(), updateMaterial);
materialRouter.delete('/delete/:materialId', auth([roles.USER,roles.ADMIN]), deleteMaterial);
materialRouter.put('/updateStatus/:materialId', auth([roles.USER,roles.ADMIN]), updateStatus);

module.exports = materialRouter;    