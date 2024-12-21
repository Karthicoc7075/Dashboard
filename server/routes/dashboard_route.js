const express = require('express');
const dashboardAuthRoutes = express.Router()    
const {getDashboardData} = require('../controllers/dashboard_controller');


dashboardAuthRoutes.get('/',getDashboardData);

module.exports = dashboardAuthRoutes;