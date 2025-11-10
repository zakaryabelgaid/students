const express = require('express');
const router = express.Router();
const cProgrammingController = require('../controllers/cProgrammingController');

// Main curriculum page
router.get('/', cProgrammingController.getCurriculum);

// Get lessons by level
router.get('/level/:level', cProgrammingController.getLessonsByLevel);

// Get individual lesson by topic
router.get('/:topic', cProgrammingController.getLesson);

// Update progress
router.post('/progress', cProgrammingController.updateProgress);

// Get all lessons (API endpoint)
router.get('/api/lessons', cProgrammingController.getAllLessons);

module.exports = router;

