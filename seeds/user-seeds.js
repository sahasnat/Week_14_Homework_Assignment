const { User } = require('../models');

const userData = [{
        username: 'Jahan',
        email: 'j@email.com',
        password: 'ajpassword22'

    },
    {
        username: 'Belal',
        email: 'b@email.com',
        password: 'mbpassword11'
    },
    {
        username: 'Ismail',
        email:'i@email.com',
        password: 'mipassword33'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;