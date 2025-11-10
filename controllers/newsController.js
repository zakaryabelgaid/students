const NewsArticle = require('../models/NewsArticle');
const User = require('../models/User');

// Get all news articles with pagination
exports.getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const news = await NewsArticle.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await NewsArticle.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.render('news/index', {
      news,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).render('error', { error: 'Failed to load news' });
  }
};

// Get single news article
exports.getNewsArticle = async (req, res) => {
  try {
    const article = await NewsArticle.findById(req.params.id)
      .populate('author', 'name');

    if (!article) {
      return res.status(404).render('error', { error: 'Article not found' });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.render('news/detail', { article });
  } catch (error) {
    console.error('Error fetching news article:', error);
    res.status(500).render('error', { error: 'Failed to load article' });
  }
};

