const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const postSchema= new mongoose.Schema({
  postText:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default:[],
  },
})
postSchema.plugin(plm);

module.exports= mongoose.model('Post',postSchema);