var express = require('express');
var router = express.Router();








/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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