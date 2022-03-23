const { Post } = require('../models');

const postData = [{
        title: 'Artifical Intelligence',
        content: "The primary goal of AI is to improve human life. It is offering humanity a new way of thinking.",
        user_id: 1

    },
    {
        title: "Microsoft",
        content: "Make personal computer accessible to most people. Now make data available for everyone with Azure, it's Microsoft.",
        user_id: 2
    },
    {
        title: "Coding",
        content: "Software is made up with. The art that change the way we think.",
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;