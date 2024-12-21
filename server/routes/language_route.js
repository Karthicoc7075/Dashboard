const express = require('express');
const  auth  = require('../middleware/auth');
const { uploadImage, allowedFormats, uploadUpdateImage } = require('../utils/multer');
const roles = require('../config/roles');

const languageRouter = express.Router();

const { createLanguage, getLanguage,getAllLanguage, updateLanguage, deleteLanguage } = require('../controllers/language_controller');

languageRouter.post('/create', auth([roles.USER,roles.ADMIN]), uploadImage(allowedFormats.IMAGE), createLanguage);
languageRouter.get('/allLanguages', auth([roles.USER,roles.ADMIN]), getAllLanguage);
languageRouter.get('/:languageId', auth([roles.USER,roles.ADMIN]), getLanguage);
languageRouter.put('/update/:languageId', auth([roles.USER,roles.ADMIN]), uploadUpdateImage(allowedFormats.IMAGE), updateLanguage);
languageRouter.delete('/delete/:languageId', auth([roles.USER,roles.ADMIN]), deleteLanguage);

module.exports = languageRouter;