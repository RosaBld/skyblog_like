const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  article: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Article' 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;