const { User } = require('../models');

const data = [
    {
        username: 'ashketchum',
        password: 'catchemall'
    },
    {
        username: 'sasukeuchiha',
        password: 'redemption'
    },
];

const seedUsers = () => User.bulkCreate(data);

module.exports = seedUsers;