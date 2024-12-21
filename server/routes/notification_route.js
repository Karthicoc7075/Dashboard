const express = require('express');
const  auth = require('../middleware/auth');
const {createNotification,notifications, deleteNotification} = require('../controllers/notification_controller');
const {uploadImage,allowedFormats} = require('../utils/multer')
const roles = require('../config/roles');

const notificationRouter = express.Router()

notificationRouter.post('/create', auth([roles.ADMIN]), uploadImage(allowedFormats.IMAGE), createNotification);
notificationRouter.get('/Allnotifications', auth([roles.ADMIN]), notifications);
notificationRouter.delete('/delete/:notificationId', auth([roles.ADMIN]), deleteNotification);

module.exports = notificationRouter;