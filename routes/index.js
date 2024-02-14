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

router.get('/', (req, res) => {
  res.render('index', { posts: posts });
});

module.exports = router;

router.get('/hello', function(req, res, next) {
  if(req.isAuthenticated()){
    res.render('hello', { title: 'Express', user: req.user
    });
  }else {
    res.render('error'
    );
  }


});