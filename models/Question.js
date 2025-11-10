const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  studentEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  question: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'answered'],
    default: 'pending'
  },
  answer: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  answeredAt: {
    type: Date
  }
});

module.exports = mongoose.model('Question', questionSchema);

