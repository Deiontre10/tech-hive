const router = require('express').Router();
const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const data = await Post.findAll({
      where: {
        user_id: req.session.userId
      },
      attributes: ["id", "title", "content", "user_id", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"]
        },
        {
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

    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, (req, res) => {
  console.log("Is this working");
  try {
    res.render('create', {
      loggedIn: req.session.loggedIn
    })

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const editPost = await Post.findByPk(req.params.id, {
      attributes: ['id', 'title', 'content', 'created_at', 'user_id'],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
      ]
    });

    const post = editPost.get({ plain: true });

    res.render('edit', {
      post,
      loggedIn: req.session.loggedIn
    })

  } catch (err) {
    res.status(500).json(err)
  }
});


module.exports = router;