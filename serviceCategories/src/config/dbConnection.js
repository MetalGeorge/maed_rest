const mysql = require('mysql');

let pool = mysql.createPool({
    host: "34.207.70.205",
    user: "devroot",
    password: "devroot.123",
    database: 'dbtantakatu'
});

exports.pool = pool;