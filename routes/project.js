const mongoose = require('mongoose');

const projectSchema= new mongoose.Schema({
  projectDescription:{
    type: String,
    required: true,
  },
  projectName:{
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default:[],
  },
});

module.exports= mongoose.model('Project',projectSchema);