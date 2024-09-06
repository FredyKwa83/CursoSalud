// routes/coursesRoutes.js
const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

router.get('/', coursesController.showCourses);

module.exports = router;
