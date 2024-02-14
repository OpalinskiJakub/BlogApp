var express = require('express');

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('./db');

passport.use(new LocalStrategy(function verify(username, password, cb) {
    // Corrected to use `query` method instead of `get`
    db.query('SELECT * FROM users WHERE username = ?', [username], function(err, results) {
        if (err) { return cb(err); }
        // The `mysql` and `mysql2` packages return an array of results
        const row = results[0];
        if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

        crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return cb(err); }
            // Need to ensure both `hashed_password` and `hashedPassword` are Buffers before using `crypto.timingSafeEqual`
            const dbHashedPassword = Buffer.from(row.hashed_password, 'binary'); // Assuming `hashed_password` is stored in a compatible format
            if (!crypto.timingSafeEqual(dbHashedPassword, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
            return cb(null, row);
        });
    });
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});


var router = express.Router();



router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/hello',
    failureRedirect: '/login'
}));

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


router.get('/signup', function(req, res, next) {
res.render('signup');
});

router.post('/signup', function(req, res, next) {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return next(err); }
        db.query('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
            req.body.username,
            hashedPassword,
            salt
        ], function(err, results) {
            if (err) { return next(err); }
            var user = {
                id: results.insertId,
                username: req.body.username
            };
            req.login(user, function(err) {
                if (err) { return next(err); }
                res.redirect('/hello');
            });
        });
    });
});


module.exports = router;