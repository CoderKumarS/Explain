var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./post');
const projectModel = require('./project');
const commentModel = require('./comment');
const passport = require('passport');
const upload = require('./multer');
const localStrategy = require("passport-local");
const http = require('http');
const socketio = require('socket.io');
const io = socketio(http);
// for login
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { error: req.flash('error') });
});
router.get('/chat', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user })
  const posts = await postModel.find()
    .populate("user")
  res.render('chat', { user, posts });
});
router.get('/chat/:url', isLoggedIn, async function (req, res, next) {
  try {
    const regex = new RegExp(`^${req.params.url}`, 'i');
    const post = await postModel.findOne({ postText: regex });

    // Fetch comments associated with the post._id
    const user = await userModel.findOne({ posts: post._id });
    const comments = await commentModel.find({ question: post._id });

    res.json({ post, comments, user });
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
router.post('/upload', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.create({
    postText: req.body.topic,
    question: req.body.question,
    user: user._id,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});
router.post('/comments', isLoggedIn, async function (req, res, next) {
  const { postId, comment } = req.body;
  const user = await userModel.findOne({ username: req.session.passport.user });
  const newComment = await commentModel.create({
    commentText: comment,
    question: postId,
    user: user._id,
  });
  user.comments.push(newComment._id);
  await user.save();
  const post = await postModel.findById(postId);
  post.comments.push(newComment._id);
  await post.save();

  // Emit a 'newComment' event with the new comment data
  io.emit('newComment', { postId, comment });

  // res.redirect("/chat"); // Redirect back to the chat page
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
  const userData = new userModel({ profile, username, email, fullname })
  userModel.register(userData, req.body.password)
    .then(() => {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/profile");
      })
    })
})

router.get("/search/:username", async (req, res) => {
  const regex = new RegExp(`^${req.params.username}`, 'i');
  const users = await userModel.find({ fullname: regex });
  res.json(users);
})
router.get("/users/:username", async (req, res) => {
  const user = await userModel.findOne({_id: req.params.username })
  .populate(["posts", "projects"]);
  res.render('profile', { user });
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