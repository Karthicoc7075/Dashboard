const express = require('express')
const { uploadImage, allowedFormats,uploadUpdateImage } = require('../utils/multer'); 
const auth = require('../middleware/auth')
const roles = require('../config/roles')
const classRouter = express.Router()
const {createClass, getAllClass,getClass, updateClass, deleteClass, getClassSubjects, createClassSubject, deleteClassSubject} = require('../controllers/class_controller')

classRouter.post('/create', auth([roles.USER,roles.ADMIN]), uploadImage(allowedFormats.IMAGE), createClass)
classRouter.get('/Allclasses', auth([roles.USER,roles.ADMIN]), getAllClass)
classRouter.get('/:classId', auth([roles.USER,roles.ADMIN]), getClass)
classRouter.put('/update/:classId', auth([roles.USER,roles.ADMIN]), uploadUpdateImage(allowedFormats.IMAGE), updateClass)
classRouter.delete('/delete/:classId', auth([roles.USER,roles.ADMIN]), deleteClass)

classRouter.post('/:classId/subject/:subjectId', auth([roles.USER,roles.ADMIN]), createClassSubject)
classRouter.get('/:classId/subjects', auth([roles.USER,roles.ADMIN]), getClassSubjects)
classRouter.delete('/:classId/subject/:subjectId', auth([roles.USER,roles.ADMIN]), deleteClassSubject)

module.exports = classRouter