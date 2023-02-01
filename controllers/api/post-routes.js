const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const data = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at', 'user_id'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [
                        'id', 'body', 'post_id', 'user_id', 'created_at'
                    ],
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                        }
                    ]
                }
            ]
        })

        const posts = data.map((post) => post.get({ plain: true }));
        res.render('homepage', posts)

    } catch (err) {

        res.status(500).json(err);

    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const data = await Post.findByPk(req.params.id, {
            attributes: ['id', 'title', 'content', 'created_at', 'user_id'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [
                        'id', 'body', 'post_id', 'user_id', 'created_at'
                    ],
                    include:
                    {
                        model: User,
                        attributes: ['username']
                    },
                },
            ],
        });

        const post = data.get({ plain: true });
        res.render('comment', { post, loggedIn: true });

    } catch (err) {

        res.status(500).json(err);

    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const data = await Post.create({
            title: req.body.title,
            content: req.body.content,
            created_at: req.body.created_at,
            user_id: req.session.userId
        });

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json(err);

    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const data = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json(err);

    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const data = await Post.destroy({
            where: {
                id: req.params.id,
            }
        });

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json(err);

    }
});

module.exports = router;