const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const data = await Post.findAll({
            attributes: ["id", "title", "body", "date_made"],
            order: [['date_made', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ["username"]
                },
                {
                    model: Comment,
                    attributes: ["id", "body", "post_id", "user_id", "date_made"],
                    include: [{
                        model: User,
                        attributes: ["username"]
                    }]
                },
            ]
        });

        res.status(200).json(data)

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router