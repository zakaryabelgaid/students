const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.get('/', lessonController.getAllLessons);
router.get('/level/:level', lessonController.getLessonsByLevel);
router.get('/:id', lessonController.getLesson);

module.exports = router;

