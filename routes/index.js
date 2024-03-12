var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./post');
const projectModel = require('./project');
const passport = require('passport');

const upload = require('./multer');

const localStrategy = require("passport-local");
// for login
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { error: req.flash('error') });
});

router.get('/chat', function (req, res, next) {
  res.render('chat');
});

router.post('/projectUpload', isLoggedIn, upload.single("projectPic"), async function (req, res, next) {
  // access the uploaded file details via req.file
  if (!req.file) {
    return res.status(404).send('No files were uploaded.');
  }
  const user = await userModel.findOne({ username: req.session.passport.user });
  const project = await projectModel.create({
    image: req.file.filename,
    projectDescription: req.body.projectDescription,
    projectName: req.body.projectName,
    user: user._id,
  });
  user.projects.push(project._id);
  await user.save();
  res.redirect("/profile");
});
router.post('/upload', isLoggedIn, upload.single("file"), async function (req, res, next) {
  // access the uploaded file details via req.file
  if (!req.file) {
    return res.status(404).send('No files were uploaded.');
  }
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.create({
    image: req.file.filename,
    postText: req.body.filecaption,
    user: user._id,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  .populate(["posts", "projects"]);
  res.render('profile', { user });
});
router.post("/register", upload.single("profile"), (req, res) => {
  const profile = req.file.filename;
  const { username, email, fullname } = req.body;
  const userData = new userModel({profile,username, email, fullname })
  userModel.register(userData, req.body.password)
    .then(() => {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/profile");
      })
    })
})
router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/",
  failureFlash: true
}), (req, res) => {

})

router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}
module.exports = router;
