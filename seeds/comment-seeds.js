const { Comment } = require('../models');

const commentData = [{
        comment_text: "Not a sci-fi version of AI",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Microsoft excels innovation!",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "Javascript brings all programmer under one umbrella.",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;