const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // const data = await Post.findAll({
    //   where: {
    //     user_id: req.session.user_id
    //   },
    //   attributes: ["id", "title", "body", "date_made"],
    //   include: [{
    //     model: Comment,
    //     attributes: ["id", "body", "post_id", "user_id", "date_made"],
    //     include: {
    //       model: User,
    //       attributes: ["username"]
    //     }
    //   },
    //   {
    //     model: User,
    //     attributes: ["username"]
    //   }
    //   ]
    // });

    // const posts = data.map(post => post.get({ plain: true }));

    res.render('dashboard', {
      // posts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const editPost = await Post.findOne({
      attributes: ['id', 'title', 'content', 'date_made'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'body', 'post_id', 'user_id', 'date_made'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = editPost.get({ plain: true });

    res.render('edit', {
      posts,
      loggedIn: req.session.loggedIn
    })

  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/new', withAuth, (req, res) => {
    res.render('create', {
      loggedIn: req.session.loggedIn
    })
});

module.exports = router;