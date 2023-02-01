const router = require('express').Router();
const { User, Post, Comment } = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const data = await Post.findAll({
      attributes: ["id", "title", "content", "user_id", "created_at"],
      include: [{
        model: Comment,
        attributes: ["id", "body", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"]
        }
      },
      ]
    });

    const posts = data.map(post => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
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
