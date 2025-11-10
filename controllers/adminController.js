const Lesson = require('../models/Lesson');
const NewsArticle = require('../models/NewsArticle');
const Question = require('../models/Question');
const User = require('../models/User');

// Admin dashboard
exports.getDashboard = async (req, res) => {
  try {
    const totalLessons = await Lesson.countDocuments();
    const totalNews = await NewsArticle.countDocuments();
    const pendingQuestions = await Question.countDocuments({ status: 'pending' });
    const totalQuestions = await Question.countDocuments();
    
    const recentLessons = await Lesson.find().sort({ createdAt: -1 }).limit(5);
    const recentNews = await NewsArticle.find().sort({ createdAt: -1 }).limit(5);
    const recentQuestions = await Question.find().sort({ createdAt: -1 }).limit(5);

    res.render('admin/dashboard', {
      stats: {
        totalLessons,
        totalNews,
        pendingQuestions,
        totalQuestions
      },
      recentLessons,
      recentNews,
      recentQuestions
    });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.status(500).render('error', { error: 'Failed to load dashboard' });
  }
};

// Create lesson
exports.createLesson = async (req, res) => {
  try {
    const { title, content, level, category } = req.body;
    
    if (!title || !content || !level || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const files = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        files.push({
          filename: file.filename,
          originalName: file.originalname,
          path: `/uploads/${file.filename}`,
          mimetype: file.mimetype,
          size: file.size
        });
      });
    }

    const lesson = new Lesson({
      title,
      content,
      level: parseInt(level),
      category,
      files
    });

    await lesson.save();
    res.redirect('/admin/lessons');
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).json({ error: 'Failed to create lesson' });
  }
};

// Create news article
exports.createNews = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    
    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Title, content, and category are required' });
    }

    const tagArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

    const news = new NewsArticle({
      title,
      content,
      author: req.session.userId,
      category,
      tags: tagArray
    });

    await news.save();
    res.redirect('/admin/news');
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ error: 'Failed to create news article' });
  }
};

// Get lessons management page
exports.getLessonsManagement = async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ createdAt: -1 });
    res.render('admin/lessons', { lessons });
  } catch (error) {
    console.error('Error loading lessons:', error);
    res.status(500).render('error', { error: 'Failed to load lessons' });
  }
};

// Get news management page
exports.getNewsManagement = async (req, res) => {
  try {
    const news = await NewsArticle.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.render('admin/news', { news });
  } catch (error) {
    console.error('Error loading news:', error);
    res.status(500).render('error', { error: 'Failed to load news' });
  }
};

