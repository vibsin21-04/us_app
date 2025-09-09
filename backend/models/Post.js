const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['RELAX', 'LEARN', 'LAUGH'],
    required: true
  },
  title: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  created_time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
