const mongoose = require('mongoose');

const postSchema= new mongoose.Schema({
  postText:{
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Comment'
  }],
});

module.exports= mongoose.model('Post',postSchema);