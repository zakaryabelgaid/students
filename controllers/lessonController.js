const Lesson = require('../models/Lesson');

// Get all lessons
exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ createdAt: -1 });
    const firstYearLessons = lessons.filter(l => l.level === 1);
    const secondYearLessons = lessons.filter(l => l.level === 2);
    
    res.render('lessons/index', {
      lessons,
      beginnerLessons: firstYearLessons,
      advancedLessons: secondYearLessons
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).render('error', { error: 'Failed to load lessons' });
  }
};

// Get lessons by level
exports.getLessonsByLevel = async (req, res) => {
  try {
    const level = parseInt(req.params.level);
    if (level !== 1 && level !== 2) {
      return res.status(400).render('error', { error: 'Invalid level' });
    }

    const lessons = await Lesson.find({ level }).sort({ createdAt: -1 });
    res.render('lessons/level', {
      lessons,
      level,
      levelName: level === 1 ? 'First Year' : 'Second Year'
    });
  } catch (error) {
    console.error('Error fetching lessons by level:', error);
    res.status(500).render('error', { error: 'Failed to load lessons' });
  }
};

// Get single lesson
exports.getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).render('error', { error: 'Lesson not found' });
    }

    res.render('lessons/detail', { lesson });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).render('error', { error: 'Failed to load lesson' });
  }
};

