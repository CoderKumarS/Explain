var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./post');
const projectModel = require('./project');
const commentModel = require('./comment');
const passport = require('passport');
const upload = require('./multer');
const localStrategy = require("passport-local");
const comment = require('./comment');
passport.use(new localStrategy(userModel.authenticate()));
router.get('/', function (req, res, next) {
  res.render('main');
});
router.get('/app', function (req, res, next) {
  res.render('index', { error: req.flash('error') });
});
router.get('/chat', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user })
  const posts = await postModel.find()
    .populate("user")
  res.render('chat', { user, posts });
});
router.get('/quest/:url', isLoggedIn, async function (req, res, next) {
  try {
      const post = await postModel.findById(req.params.url);
      const user = await userModel.findOne({ posts: post._id });
      const comments = await commentModel.find({ question: post._id }).populate("user");
      res.render('quest',{ post, comments, user });
    } catch (error) {
      console.error('Error fetching chat:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/chat/:url', isLoggedIn, async function (req, res, next) {
  try {
    const regex = new RegExp(`^${req.params.url}`, 'i');
    const post = await postModel.findOne({ postText: regex });

    // Fetch comments associated with the post._id
    const user = await userModel.findOne({ posts: post._id });
    const comments = await commentModel.find({ question: post._id }).populate("user");

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
  res.redirect("/chat"); // Redirect back to the chat page
});
router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
    .populate(["posts", "projects"]);
  res.render('profile', { user });
});
router.post("/register",(req, res) => {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname })

  userModel.register(userData, req.body.password, (err) => {
    if (err) {
      req.flash("error", err.message);
      res.redirect("/loginapp");
    } else {
      passport.authenticate("local", {
        successRedirect: "/edit",
        failureRedirect: "/loginapp",
        failureFlash: true
      })(req, res);
    }
  });
});
router.get('/loginapp', function (req, res, next) {
  const error = req.flash('error');
  res.render('register', { error });
});
router.get('/forgot', function (req, res, next) {
  const error = req.flash('error');
  res.render('forgot', { error });
});
router.post('/forgot', async function (req, res, next) {
  const { username, email } = req.body;
  const user = await userModel.findOne({ username: username, email: email }); 
    if (!user) {
      req.flash('error', 'User not found');
      res.redirect('/forgot');
    } else {
      res.redirect(`/reset/${user._id}`);
    }
  });

router.get('/reset/:userId', async function (req, res, next) {
  const error = req.flash('error');
  const user = await userModel.findById(req.params.userId);
  res.render('reset', { error, user});
});

router.post('/reset/:user', function (req, res, next) {
  const { password, confirm } = req.body;
  if (password !== confirm) {
    req.flash('error', 'Passwords do not match');
    res.redirect(`/reset/${req.params.user}`);
  } else {
    userModel.findById(req.params.user, (err, user) => {
      if (err) {
        req.flash('error', err.message);
        res.redirect(`/reset/${req.params.user}`);
      } else {
        user.password = password;
        user.save((err) => {
          if (err) {
            req.flash('error', err.message);
            res.redirect(`/reset/${req.params.user}`);
          } else {
            req.flash('success', 'Password reset successfully');
            res.redirect('/loginapp');
          }
        });
      }
    });
  }
});

router.get('/edit', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render('edit', { user });
});
router.post('/updatePic', isLoggedIn, upload.single("image"), async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  user.profile = req.file.filename;
  await user.save();
  res.redirect("/edit");
});
router.post('/update', isLoggedIn, async function (req, res) {
  const user = await userModel.findOneAndUpdate({ username: req.session.passport.user },{ username: req.body.username, fullname: req.body.fullname, bio: req.body.bio }, { new: true });
  await user.save();
  res.redirect("/profile");
});
router.put('/contact/:contact', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  user.contacts.push(req.params.contact);
  await user.save();
  res.json(req.params.contact);
});
router.put('/skill/:skill', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  user.skills.push(req.params.skill);
  await user.save();
  res.json(req.params.skill);
});
router.put('/language/:language', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  user.languages.push(req.params.language);
  await user.save();
  res.json(req.params.language);
});
router.get("/search/:username", async (req, res) => {
  const regex = new RegExp(`^${req.params.username}`, 'i');
  const users = await userModel.find({ fullname: regex });
  res.json(users);
})
router.get("/users/:username", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.username })
    .populate(["posts", "projects"]);
  res.render('vprofile', { user });
})
router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/app",
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