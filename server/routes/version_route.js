const express = require('express');
const auth = require('../middleware/auth');
const roles = require('../config/roles');

const versionRouter = express.Router();

const { createVersion, getAllVersions,getVersion,updateVersion, deleteVersion } = require('../controllers/version_controller');

versionRouter.post('/create', auth([roles.ADMIN]),  createVersion);
versionRouter.get('/allVersions', auth([roles.ADMIN]),  getAllVersions);
versionRouter.get('/:versionId', auth([roles.ADMIN]),  getVersion);
versionRouter.put('/update/:versionId', auth([roles.ADMIN]),  updateVersion);
versionRouter.delete('/delete/:versionId', auth([roles.ADMIN]),  deleteVersion);


module.exports = versionRouter;