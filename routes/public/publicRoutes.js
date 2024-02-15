var express = require('express');
const db = require("../db");
var router = express.Router();






router.get('/', function (req, res, next) {


        db.query('SELECT * FROM posts JOIN users ON posts.authorId=users.id;  ', (err, results) => {
            if (err) throw err;


            res.render('public/indexPreview', {posts: results});
        });

});

router.get('/post/:id', (req, res) => {
    const postId = req.params.id;


    const query = 'SELECT * FROM posts JOIN users ON posts.authorId=users.id WHERE postId = ?';
    db.query(query, [postId], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const post = results[0];
            res.render('public/postPanelPreview', {post: post});
        } else {
            res.send('Not Found');
        }
    });
});

module.exports = router;
