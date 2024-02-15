var express = require('express');
var router = express.Router();
var db = require('../db');


router.get('/', function (req, res, next) {

    if (req.isAuthenticated()) {
        db.query('SELECT * FROM posts JOIN users ON posts.authorId=users.id;  ', (err, results) => {
            if (err) throw err;


            res.render('private/index', {posts: results});
        });
        console.log(req.user);
    } else {
        res.redirect('/login')
    }

});


router.get('/createPost', function (req, res, next) {

    if (req.isAuthenticated()) {
        res.render('private/postCreatePanel');
    } else {
        res.redirect('/login')
    }
});
router.post('/createPost', (req, res) => {
    const {postTitle, postContent} = req.body;
    const authorId = req.user.id;
    if (!postTitle || !postContent || !authorId) {
        return res.status(400);
    }

    const query = 'INSERT INTO posts (postTitle, postContent, authorId) VALUES (?, ?, ?)';
    db.query(query, [postTitle, postContent, authorId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500);
        }
        res.redirect('/auth');
    });
});


router.get('/userPosts', (req, res) => {
    const userId = req.user.id;

    const query = 'SELECT * FROM posts WHERE authorId = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500);
        }

        res.render('private/userPosts', {posts: results});

    });
});

router.delete('/post/:postId', (req, res) => {
    const postId = req.params.postId;
    const query = 'DELETE FROM posts WHERE postId = ?';
    db.query(query, [postId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500);
        }
        res.status(200);

    });
});


/*router.get('/userPanel', function (req, res, next) {

    if (req.isAuthenticated()) {
        res.render('private/userPanel', {posts: posts});
    } else {
        res.redirect('/login')
    }
});*/


router.get('/userPanel', (req, res) => {
    const userId = req.user.id;
    const query = 'SELECT * FROM users WHERE id = ?';

    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Błąd serwera');
        }
        if (result.length > 0) {
            res.render('private/userPanel', { user: result[0] });
        } else {
            res.status(404);
        }
    });
});

router.post('/usernameUpdate/', (req, res) => {
    const userId = req.user.id;
    const { newUsername } = req.body;

    const query = 'UPDATE users SET username = ? WHERE id = ?';
    db.query(query, [newUsername, userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500);
        }

        res.redirect('/auth/userPanel');
    });
});



router.get('/post/:id', (req, res) => {
    const postId = req.params.id;


    const query = 'SELECT * FROM posts JOIN users ON posts.authorId=users.id WHERE postId = ?';
    db.query(query, [postId], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const post = results[0];
            res.render('private/postPanel', {post: post});
        } else {
            res.send('Not Found');
        }
    });
});


module.exports = router;
