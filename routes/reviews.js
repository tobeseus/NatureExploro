const express = require('express');
const router = express.Router({ mergeParams: true });
const { parkSchema, reviewSchema } = require('../schemas.js')
const catchAsync = require('../utils/catchAsync');
const Park = require('../models/park');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;