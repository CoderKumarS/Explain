const mongoose = require('mongoose');
require('dotenv').config();
const MongoUri = process.env.MONGO_URI;
const plm = require('passport-local-mongoose');
mongoose.connect(MongoUri)
.then(()=>console.log("Connected to database"))
.catch((err)=>console.log(err));

const userSchema= new mongoose.Schema({
  username:{
    type:String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
  },
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post',
  }],
  projects:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Project',
  }],
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Comment',
  }],
  profile:{
    type: String,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  fullname:{
    type:String,
    required:true,
  },
  bio:{
    type:String
  },
  course:{
    type:String
  },
  skills:[{
    type:String
  }],
  languages:[{
    type:String
  }],
  contacts:[{
    type:String
  }],
})
userSchema.plugin(plm);

module.exports= mongoose.model('User',userSchema);