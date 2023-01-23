const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const data = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
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

    res.render('dashboard', {
      blogPost,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const data = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'body', 'date_made'],
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

    if (!data) {
      res.status(404).json({ message: "No post found!" });
      return;
    }

    const blogPost = data.get({ plain: true });

    res.render('edit', {
      blogPost,
      loggedIn: req.session.loggedIn
    })

  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/create', withAuth, async (req, res) => {
  try {
    const data = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: ['id', 'title', 'body', 'date_made'],
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
    })

    const blogPost = data.map(post => post.get({ plain: true }));

    res.render('create', {
      blogPost,
      loggedIn: req.session.loggedIn
    })

  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;