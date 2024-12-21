const express = require('express');
const { uploadImage,uploadUpdateImage, allowedFormats } = require('../utils/multer'); 
const auth  = require('../middleware/auth');
const roles = require('../config/roles');

const subjectRouter = express.Router();

const { createSubject,getSubject, getAllSubjects, updateSubject, deleteSubject } = require('../controllers/subject_controller');

subjectRouter.post('/create',auth([roles.USER,roles.ADMIN]),  uploadImage(allowedFormats.IMAGE), createSubject);
subjectRouter.get('/allSubjects',auth([roles.USER,roles.ADMIN]),  getAllSubjects);
subjectRouter.get('/:subjectId',auth([roles.USER,roles.ADMIN]),  getSubject);
subjectRouter.put('/update/:subjectId',auth([roles.USER,roles.ADMIN]),  uploadUpdateImage(allowedFormats.IMAGE), updateSubject);
subjectRouter.delete('/delete/:subjectId',auth([roles.USER,roles.ADMIN]),  deleteSubject);

module.exports = subjectRouter;