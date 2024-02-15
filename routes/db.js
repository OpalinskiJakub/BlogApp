var mysql = require('mysql2');
var crypto = require('crypto');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'jakub',
    password: 'user',
    database: 'blogAppDataBase',
    port: 2115
});


var queryFirstUser = `INSERT INTO users (username, hashed_password, salt)
                      VALUES (?, ?, ?) ON DUPLICATE KEY
UPDATE
    username =
VALUES (username);`;

var salt = crypto.randomBytes(16);


var hashedPassword = crypto.pbkdf2Sync('letmein', salt, 310000, 32, 'sha256');


db.query(queryFirstUser, [
    'alice',
    hashedPassword,
    salt
], function (err, results) {
    if (err) {
        console.error('Error inserting user:', err);
        return;
    }
    console.log('User inserted or already exists.');
});


module.exports = db;
