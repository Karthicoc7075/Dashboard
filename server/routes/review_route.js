const express = require('express');
const auth  = require('../middleware/auth');
const { createReview, getAllReviews, deleteReview } = require('../controllers/review_controller');
const roles = require('../config/roles');

const reviewRouter = express.Router();


reviewRouter.post('/create', auth([roles.ADMIN]), createReview);
reviewRouter.get('/allReviews', auth([roles.ADMIN]), getAllReviews);
reviewRouter.delete('/delete/:reviewId', auth([roles.ADMIN]), deleteReview);

module.exports = reviewRouter;