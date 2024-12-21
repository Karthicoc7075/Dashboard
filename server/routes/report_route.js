const express = require('express');
const auth  = require('../middleware/auth');
const { createReport, getAllReports,solveReport, deleteReport } = require('../controllers/report_controller');
const roles = require('../config/roles');
const reportRouter = express.Router();



reportRouter.post('/create',auth([roles.ADMIN]), createReport);
reportRouter.get('/allReports',auth([roles.ADMIN]), getAllReports);
reportRouter.put('/solve/:reportId',auth([roles.ADMIN]), solveReport);
reportRouter.delete('/delete/:reportId',auth([roles.ADMIN]), deleteReport);

module.exports = reportRouter;