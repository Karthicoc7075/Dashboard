const express = require('express');
const auth  = require('../middleware/auth');
const roles = require('../config/roles');

const supportRouter = express.Router();

const { createSupport, getAllSupports, deleteSupport,solveSupport } = require('../controllers/support_controller');

supportRouter.post('/create', auth([roles.ADMIN]),  createSupport);
supportRouter.get('/allSupports', auth([roles.ADMIN]),  getAllSupports);
supportRouter.delete('/delete/:supportId', auth([roles.ADMIN]),  deleteSupport);
supportRouter.put('/solve/:supportId', auth([roles.ADMIN]),  solveSupport);

module.exports = supportRouter;

