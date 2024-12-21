const express = require('express');

const dashboardUserRoutes = express.Router()
const auth = require('../middleware/auth');
const roles = require('../config/roles');

const {getUsers,getUser,createUser,updateUser,deleteUser} = require('../controllers/dashboard_user_controller');

dashboardUserRoutes.get('/users',auth([roles.ADMIN]), getUsers);
dashboardUserRoutes.get('/users/:userId',auth([roles.ADMIN]), getUser);
dashboardUserRoutes.post('/users',auth([roles.ADMIN]), createUser);
dashboardUserRoutes.put('/users/:userId',auth([roles.ADMIN]), updateUser);
dashboardUserRoutes.delete('/users/:userId',auth([roles.ADMIN]), deleteUser);

module.exports = dashboardUserRoutes;
