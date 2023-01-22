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