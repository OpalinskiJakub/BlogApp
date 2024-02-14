var express = require('express');
var router = express.Router();






const posts = [
    { title: "Tytuł posta 1", content: "Zawartość posta 1, która jest naprawdę interesująca i wciągająca." },
    { title: "Tytuł posta 2", content: "Zawartość posta 2, zawierająca wiele ciekawych informacji i wniosków." },
    { title: "Tytuł posta 1", content: "Zawartość posta 1, która jest naprawdę interesująca i wciągająca." },
    { title: "Tytuł posta 2", content: "Zawartość posta 2, zawierająca wiele ciekawych informacji i wniosków." },
    { title: "Tytuł posta 1", content: "Zawartość posta 1, która jest naprawdę interesująca i wciągająca." },
    { title: "Tytuł posta 2", content: "Zawartość posta 2, zawierająca wiele ciekawych informacji i wniosków." },
    { title: "Tytuł posta 1", content: "Zawartość posta 1, która jest naprawdę interesująca i wciągająca." },
    { title: "Tytuł posta 2", content: "Zawartość posta 2, zawierająca wiele ciekawych informacji i wniosków." }
];



router.get('/', function(req, res, next) {

    if(req.isAuthenticated()){
        res.render('private/index',{ posts: posts });
    }else {
        res.redirect('/login')
    }
});
router.get('/createPost', function(req, res, next) {

    if(req.isAuthenticated()){
        res.render('private/postCreatePanel');
    }else {
        res.redirect('/login')
    }
});
router.get('/userPosts', function(req, res, next) {

    if(req.isAuthenticated()){
        res.render('private/userPosts',{ posts: posts });
    }else {
        res.redirect('/login')
    }
});

router.get('/userPanel', function(req, res, next) {

    if(req.isAuthenticated()){
        res.render('private/userPanel',{ posts: posts });
    }else {
        res.redirect('/login')
    }
});

router.get('/postPanel', function(req, res, next) {

    if(req.isAuthenticated()){
        res.render('private/index',{ posts: posts });
    }else {
        res.redirect('/login')
    }
});


module.exports = router;
