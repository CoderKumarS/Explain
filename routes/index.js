var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./post');
const passport = require('passport');
const localStrategy = require("passport-local");
// for login
passport.use( new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {error: req.flash('error')});
});

router.get('/chat', function (req, res, next) {
  res.render('chat');
});
router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('profile', {title: "Kumar"});
});
router.post("/register", (req, res) => {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username,email,fullname})
  userModel.register(userData, req.body.password)
  .then(()=>{
    passport.authenticate("local")(req,res,()=>{
      res.redirect("/profile");
    })
  })
})
router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect:"/",
  failureFlash:true
}), (req, res) => {

})

router.get("/logout", (req,res)=>{
  req.logOut((err)=>{
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
})

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()) return next();
  res.redirect("/");
}
module.exports = router;
