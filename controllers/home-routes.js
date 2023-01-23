const router = require('express').Router();
const { User, Post, Comment } = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const data = await Post.findAll({
      attributes: ["id", "title", "body", "date_made"],
      include: [{
        model: Comment,
        attributes: ["id", "body", "post_id", "user_id", "date_made"],
        include: {
          model: User,
          attributes: ["username"]
        }
      },
      {
        model: User,
        attributes: ["username"]
      }
      ]
    });

    const blogPost = data.map(post => post.get({ plain: true }));

    res.render('homepage', {
      blogPost,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
