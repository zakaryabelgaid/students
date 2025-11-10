const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const NewsArticle = require('../models/NewsArticle');
const Question = require('../models/Question');

// Home page
router.get('/', async (req, res) => {
  try {
    const recentLessons = await Lesson.find().sort({ createdAt: -1 }).limit(3);
    const recentNews = await NewsArticle.find().sort({ createdAt: -1 }).limit(3);
    const pendingQuestions = await Question.countDocuments({ status: 'pending' });

    res.render('index', {
      recentLessons,
      recentNews,
      pendingQuestions
    });
  } catch (error) {
    console.error('Error loading home page:', error);
    res.status(500).render('error', { error: 'Failed to load home page' });
  }
});

module.exports = router;

