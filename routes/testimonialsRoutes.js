// routes/testimonialsRoutes.js
const express = require('express');
const router = express.Router();
const testimonialsController = require('../controllers/testimonialsController');

router.get('/', testimonialsController.showTestimonials);

module.exports = router;
