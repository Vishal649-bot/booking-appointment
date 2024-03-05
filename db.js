const mysql = require('mysql2/promise');


// MySQL Connection
const mysqlpool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'qwert@4321',
    database: 'node-complete'
});


module.exports = mysqlpool