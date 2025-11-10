const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: String, // Can be session ID or user ID
    required: true
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started'
  },
  timeSpent: {
    type: Number, // in minutes
    default: 0
  },
  completedAt: {
    type: Date
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  exercisesCompleted: [{
    exerciseId: Number, // Index in exercises array
    completedAt: Date
  }]
}, {
  timestamps: true
});

// Compound index for efficient queries
progressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);

