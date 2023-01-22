const { Post } = require('../models');

const data = [
    {
        title: 'Pikachu is the GOAT',
        body: 'Pikachu carried my carrier as a trainer',
        user_id: 1,
    },
    {
        title: 'The Hidden Leaf is the GOAT',
        body: 'Who can compete with me and Naruto',
        user_id: 2,
    },
];

const seedPosts = () => Post.bulkCreate(data);

module.exports = seedPosts;