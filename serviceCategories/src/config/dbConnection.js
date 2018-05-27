const mysql = require('mysql');

let pool = mysql.createPool({
    // host: "34.207.70.205",
    // user: "devroot",
    // password: "devroot.123",
    host: "localhost",
    user: "root",
    password: "",
    database: 'dbtantakatu'
});

exports.pool = pool;