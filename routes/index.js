var express = require('express');
var router = express.Router();

var mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'jakub',
  password: 'user',
  database: 'blogAppDataBase',
  port: 2115
});


connection.connect(error => {
  if (error) {
    console.error('Błąd połączenia: ' + error.stack);
    return;
  }

  console.log('Połączono jako ID ' + connection.threadId);

  const query = 'SELECT * FROM posts'; // Zastąp `nazwa_tabeli` rzeczywistą nazwą tabeli, którą chcesz przeszukać
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Błąd zapytania: ' + error.stack);
      return;
    }


    console.log(results); // Pokazuje wyniki zapytania
  });

});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/uwu', (req, res) => {
res.render('hello')
})