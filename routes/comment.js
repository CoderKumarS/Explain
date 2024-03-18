const mongoose = require('mongoose');

const commentSchema= new mongoose.Schema({
  commentText:{
    type: String,
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports= mongoose.model('Comment',commentSchema);