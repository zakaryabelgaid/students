const Question = require('../models/Question');

// Get Q&A page
exports.getQA = async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ createdAt: -1 })
      .limit(10); // Show recent questions

    res.render('qa/index', { questions, success: null, error: null });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.render('qa/index', { questions: [], success: null, error: 'Failed to load questions' });
  }
};

// Submit question
exports.submitQuestion = async (req, res) => {
  try {
    const { studentName, studentEmail, question } = req.body;

    if (!studentName || !studentEmail || !question) {
      return res.render('qa/index', {
        questions: [],
        success: null,
        error: 'All fields are required'
      });
    }

    const newQuestion = new Question({
      studentName,
      studentEmail,
      question,
      status: 'pending'
    });

    await newQuestion.save();

    const questions = await Question.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.render('qa/index', {
      questions,
      success: 'Your question has been submitted successfully!',
      error: null
    });
  } catch (error) {
    console.error('Error submitting question:', error);
    res.render('qa/index', {
      questions: [],
      success: null,
      error: 'Failed to submit question. Please try again.'
    });
  }
};

// Get all questions (admin)
exports.getAllQuestions = async (req, res) => {
  try {
    const status = req.query.status || 'all';
    let query = {};
    
    if (status !== 'all') {
      query.status = status;
    }

    const questions = await Question.find(query).sort({ createdAt: -1 });
    const pendingCount = await Question.countDocuments({ status: 'pending' });

    res.render('admin/questions', {
      questions,
      pendingCount,
      currentFilter: status
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).render('error', { error: 'Failed to load questions' });
  }
};

// Generate Gmail link for answering
exports.getGmailLink = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);
    
    if (!question) {
      return res.status(404).render('error', { error: 'Question not found' });
    }
    
    // Create Gmail compose link
    const subject = encodeURIComponent(`Re: Question from ${question.studentName}`);
    const body = encodeURIComponent(`Hello ${question.studentName},\n\nRegarding your question:\n\n"${question.question}"\n\nBest regards,\nAdmin`);
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(question.studentEmail)}&su=${subject}&body=${body}`;
    
    res.redirect(gmailLink);
  } catch (error) {
    console.error('Error generating Gmail link:', error);
    res.status(500).render('error', { error: 'Failed to generate Gmail link' });
  }
};

