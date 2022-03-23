const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection')


router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            order: [['created_at', 'DESC']],
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        })
        res.json(postData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        });
        const post = postData.get({ plain: true });
        res.render('partials/single-post', {
            ...post 
            
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);

router.post('/', withAuth, async (req, res) => {
    try {
        const newPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        res.json(newPostData)
       
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
            {
                where: {
                    id: req.params.id
                }
            })
        if (!postData) {
            res.status(404).json({ message: 'No post found.' });

        }
        res.json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'No post with this id.' });
            return;
        }
        res.json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});




module.exports = router;




