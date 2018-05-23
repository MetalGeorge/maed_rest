var VerifyToken = require('./VerifyToken');
var dbConnection = require('../../config/dbConnection').pool;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config/config');
var logger = require('../../config/log');

module.exports = app => {

    app.use(function(item, req, res, next) {
        res.status(200).send(item);
    });

    /* GET items listing. */
    //app.get('/items',  VerifyToken,  (req, res) => {     
    app.get('/items', (req, res) => {
  
        logger.info("GET: /items");

        var sql = "SELECT * FROM dbtantakatu.item ORDER BY id";
        console.log(sql);

        dbConnection.getConnection(function(err, connection) {
            connection.query(sql, (err, result) => {
                res.json(result);
            });
            connection.release();
        });

    });

};