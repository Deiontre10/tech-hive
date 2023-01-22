const { Comment } = require('../models');

const data = [
    {
        body: 'I wanna be the very best',
        user_id: 1,
        post_id: 1
    },
    {
        body: 'Please forgive me',
        user_id: 2,
        post_id: 2
    },
];

const seedComments = () => Comment.bulkCreate(data);

module.exports = seedComments;