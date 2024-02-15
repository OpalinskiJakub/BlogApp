var mysql = require('mysql2');
var crypto = require('crypto');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'jakub',
    password: 'user',
    database: 'blogAppDataBase',
    port: 2115
});




var salt = crypto.randomBytes(16);





module.exports = db;
