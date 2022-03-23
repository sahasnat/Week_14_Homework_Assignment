const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('.././utils/auth');
const router = require('express').Router();
const path = require('path');
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
            ]
        })
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.get('/posts/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: ['title', 'content', 'created_at'],
            include: [{
                model: User,
                attributes: ['username']
            }],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
            }]
        })
        const post = postData.get({ plain: true });
        res.render('partials/single-post', {
            ...post,
            logged_in: true
        })
        
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            loggedIn: true
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }else {
    res.render('login');
    }
});

router.get('/signup', (req, res) => {
    res.render('signup');
});


module.exports = router;