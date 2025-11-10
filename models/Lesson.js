const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  path: String,
  mimetype: String,
  size: Number,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    enum: [1, 2], // 1 = first year, 2 = second year
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  files: [fileSchema],
  // C Programming specific fields
  codeExamples: [{
    title: String,
    code: String,
    explanation: String,
    language: { type: String, default: 'c' }
  }],
  exercises: [{
    title: String,
    description: String,
    solution: String,
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }
  }],
  estimatedTime: {
    type: Number, // in minutes
    default: 30
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  topic: {
    type: String, // For C Programming: 'variables', 'pointers', etc.
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

lessonSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Lesson', lessonSchema);

