const mysql = require('mysql');

let pool = mysql.createPool({
    host: "servidormaedwebserviciosweb.mysql.database.azure.com",
    user: "adminjoraca@servidormaedwebserviciosweb",
    password: "Maestria.123",
    database: 'dbtantakatu'
});

exports.pool = pool;