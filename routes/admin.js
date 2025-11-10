const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const questionController = require('../controllers/questionController');
const { requireAuth, requireAdmin, redirectIfLoggedIn } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Login routes
router.get('/login', redirectIfLoggedIn, authController.getLogin);
router.post('/login', redirectIfLoggedIn, authController.postLogin);
router.get('/logout', authController.logout);

// Protected admin routes
router.get('/', requireAuth, requireAdmin, adminController.getDashboard);
router.get('/lessons', requireAuth, requireAdmin, adminController.getLessonsManagement);
router.get('/news', requireAuth, requireAdmin, adminController.getNewsManagement);
router.get('/questions', requireAuth, requireAdmin, questionController.getAllQuestions);

// Create content routes
router.post('/lessons', requireAuth, requireAdmin, upload.array('files', 10), adminController.createLesson);
router.post('/news', requireAuth, requireAdmin, adminController.createNews);

// Gmail link for questions
router.get('/questions/:id/gmail', requireAuth, requireAdmin, questionController.getGmailLink);

module.exports = router;

