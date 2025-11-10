const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');

// Get user ID from session or generate one
const getUserId = (req) => {
  return req.session.userId || req.sessionID || 'anonymous';
};

// Main curriculum overview
exports.getCurriculum = async (req, res) => {
  try {
    const lessons = await Lesson.find({ category: 'C Programming' })
      .sort({ level: 1, createdAt: 1 })
      .populate('prerequisites', 'title');
    
    const userId = getUserId(req);
    const progressRecords = await Progress.find({ userId });
    
    // Map progress to lessons
    const lessonsWithProgress = lessons.map(lesson => {
      const progress = progressRecords.find(p => p.lessonId.toString() === lesson._id.toString());
      return {
        ...lesson.toObject(),
        progress: progress ? {
          status: progress.status,
          timeSpent: progress.timeSpent || 0
        } : { status: 'not_started', timeSpent: 0 }
      };
    });
    
    // Group lessons by level (after adding progress)
    const level1Lessons = lessonsWithProgress.filter(l => l.level === 1);
    const level2Lessons = lessonsWithProgress.filter(l => l.level === 2);
    
    res.render('c-programming/index', {
      lessons: lessonsWithProgress,
      level1Lessons: level1Lessons,
      level2Lessons: level2Lessons,
      totalLessons: lessons.length,
      completedLessons: progressRecords.filter(p => p.status === 'completed').length
    });
  } catch (error) {
    console.error('Error loading C Programming curriculum:', error);
    res.status(500).render('error', { error: 'Failed to load curriculum' });
  }
};

// Get lessons by level
exports.getLessonsByLevel = async (req, res) => {
  try {
    const level = parseInt(req.params.level);
    if (level !== 1 && level !== 2) {
      return res.status(400).render('error', { error: 'Invalid level' });
    }
    
    const lessons = await Lesson.find({ 
      category: 'C Programming',
      level 
    }).sort({ createdAt: 1 }).populate('prerequisites', 'title');
    
    const userId = getUserId(req);
    const progressRecords = await Progress.find({ userId });
    
    const lessonsWithProgress = lessons.map(lesson => {
      const progress = progressRecords.find(p => p.lessonId.toString() === lesson._id.toString());
      return {
        ...lesson.toObject(),
        progress: progress ? {
          status: progress.status,
          timeSpent: progress.timeSpent || 0
        } : { status: 'not_started', timeSpent: 0 }
      };
    });
    
    res.render('c-programming/level-overview', {
      lessons: lessonsWithProgress,
      level,
      levelName: level === 1 ? 'Fundamentals' : 'Advanced Concepts'
    });
  } catch (error) {
    console.error('Error loading lessons by level:', error);
    res.status(500).render('error', { error: 'Failed to load lessons' });
  }
};

// Get individual lesson
exports.getLesson = async (req, res) => {
  try {
    const topic = req.params.topic;
    const lesson = await Lesson.findOne({ 
      category: 'C Programming',
      topic 
    }).populate('prerequisites', 'title topic');
    
    if (!lesson) {
      return res.status(404).render('error', { error: 'Lesson not found' });
    }
    
    // Get all lessons for navigation
    const allLessons = await Lesson.find({ category: 'C Programming' })
      .sort({ level: 1, createdAt: 1 })
      .select('title topic level');
    
    const currentIndex = allLessons.findIndex(l => l.topic === topic);
    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
    
    // Get or create progress
    const userId = getUserId(req);
    let progress = await Progress.findOne({ userId, lessonId: lesson._id });
    
    if (!progress) {
      progress = new Progress({
        userId,
        lessonId: lesson._id,
        status: 'in_progress'
      });
      await progress.save();
    } else {
      progress.lastAccessed = new Date();
      await progress.save();
    }
    
    res.render('c-programming/lesson', {
      lesson,
      prevLesson,
      nextLesson,
      allLessons,
      progress
    });
  } catch (error) {
    console.error('Error loading lesson:', error);
    res.status(500).render('error', { error: 'Failed to load lesson' });
  }
};

// Update progress
exports.updateProgress = async (req, res) => {
  try {
    const { lessonId, status, timeSpent, exerciseId } = req.body;
    const userId = getUserId(req);
    
    let progress = await Progress.findOne({ userId, lessonId });
    
    if (!progress) {
      progress = new Progress({
        userId,
        lessonId,
        status: status || 'in_progress',
        timeSpent: timeSpent || 0
      });
    } else {
      if (status) progress.status = status;
      if (timeSpent) progress.timeSpent += timeSpent;
      if (status === 'completed') {
        progress.completedAt = new Date();
      }
    }
    
    if (exerciseId !== undefined) {
      const exerciseIndex = progress.exercisesCompleted.findIndex(
        e => e.exerciseId === exerciseId
      );
      if (exerciseIndex === -1) {
        progress.exercisesCompleted.push({
          exerciseId,
          completedAt: new Date()
        });
      }
    }
    
    await progress.save();
    
    res.json({ success: true, progress });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ success: false, error: 'Failed to update progress' });
  }
};

// Get all lessons for navigation
exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ category: 'C Programming' })
      .sort({ level: 1, createdAt: 1 })
      .select('title topic level');
    
    res.json({ lessons });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
};

