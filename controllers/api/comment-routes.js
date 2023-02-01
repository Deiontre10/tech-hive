const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const data = await Comment.findAll({
            attributes: ['id', 'body', 'user_id', 'post_id', 'created_at'],
            include: [
                {
                    model: Post,
                    attributes: ['title'],
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json(err);

    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await Comment.findByPk(req.params.id, {
            attributes: ['id', 'body', 'user_id', 'post_id', 'created_at'],
            include: [
                {
                    model: Post,
                    attributes: ['title'],
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json(err);

    }
});

router.post('/', withAuth, async (req, res) => {
    try {
            const data = await Comment.create({
                body: req.body.body,
                post_id: req.body.post_id,
                user_id: req.session.userId,
                created_at: req.body.created_at
            });

            res.status(200).json(data);

    } catch (err) {

        res.status(500).json(err);

    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const data = await Comment.update(
            {
                body: req.body.body
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
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const data = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json(err);
        
    }
});

module.exports = router;