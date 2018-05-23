const mysql = require('mysql');

let pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: 'dbtantakatu'
});

exports.pool = pool;