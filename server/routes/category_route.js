const express = require('express');
const { uploadImage,uploadUpdateImage, allowedFormats } = require('../utils/multer'); 
const auth = require('../middleware/auth')
const roles = require('../config/roles');

const categoryRouter = express.Router();

const { createCategory,getCategory, getAllCategory, updateCategory, deleteCategory } = require('../controllers/category_controller');

categoryRouter.post('/create',auth([roles.USER,roles.ADMIN]), uploadImage(allowedFormats.IMAGE), createCategory);
categoryRouter.get('/allCategories',auth([roles.USER,roles.ADMIN]),  getAllCategory);
categoryRouter.get('/:categoryId',auth([roles.USER,roles.ADMIN]),  getCategory);

categoryRouter.put('/update/:categoryId',auth([roles.USER,roles.ADMIN]),  uploadUpdateImage(allowedFormats.IMAGE),updateCategory);
categoryRouter.delete('/delete/:categoryId',auth([roles.USER,roles.ADMIN]),  deleteCategory);

module.exports = categoryRouter;