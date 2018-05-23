var VerifyToken = require('./VerifyToken');
var dbConnection = require('../../config/dbConnection').pool;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var dateFormat = require('dateformat');
var config = require('../../config/config');
var logger = require('../../config/log');

module.exports = app => {

    app.use(function(item, req, res, next) {
        res.status(200).send(item);
    });

    /* GET items listing. */
    //app.get('/api/v1/items', VerifyToken, (req, res) => {     
    app.get('/api/v1/items', (req, res) => {
        logger.info("GET: /api/v1/items");

        var sql = "SELECT * FROM dbtantakatu.item ORDER BY id";
        console.log(sql);

        dbConnection.getConnection(function(err, connection) {
            connection.query(sql, (err, result) => {
                res.json(result);
            });
            connection.release();
        });
    });

    /* GET a item. */
    //app.get('/api/v1/items/:id', VerifyToken, (req, res) => {     
    app.get('/api/v1/items/:id', (req, res) => {
        logger.info("GET: /api/v1/items/:id");

        var sql = "SELECT * FROM dbtantakatu.item WHERE id=" + req.params.id + ";";
        console.log(sql);

        dbConnection.getConnection(function(err, connection) {
            connection.query(sql, (err, result) => {
                res.json(result);
            });
            connection.release();
        });
    });

    /* POST item creating. */
    //app.post('/api/v1/items', VerifyToken, (req, res) => {     
    app.post('/api/v1/items', (req, res) => {
        logger.info("POST: /api/v1/items");

        console.log(req.userid + "\n");
        req.userid = "A;HJADFHLSEHRJLSDKJHSLFDKJ";

        var publicationdate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

        const body = req.body;
        var sql = "INSERT INTO dbtantakatu.item (categoryid, userid, name, description, price, photo, publicationdate) VALUES (" +
                body.categoryid + ", '" + req.userid + "', '" + body.name +  "', '" + body.description +
                "', " + body.price + ", '" + body.photo + "', '" + publicationdate + "');";
        console.log(sql);

        dbConnection.getConnection(function(err, connection){
            connection.query(sql, function(err, result) {
                if (err) {
                    res.json({ error: err })
                };
                logger.info("Item created");
                console.log("Item created");                
            });
            res.end();
            connection.release();
        });
    });

    /* PUT item updating. */
    //app.put('/api/v1/items/:id', VerifyToken, (req, res) => {     
    app.put('/api/v1/items/:id', (req, res) => {
        logger.info("PUT: /api/v1/items/:id");

        console.log(req.userid + "\n");
        req.userid = "A;HJADFHLSEHRJLSDKJHSLFDKJ";

        const body = req.body;
        var sql = "UPDATE dbtantakatu.item SET categoryid=" + body.categoryid + ", name='" + body.name + 
                "', description='" + body.description + "', price=" + body.price + ", photo='" + body.photo + 
                "' WHERE id=" + req.params.id + ";";
        console.log(sql);

        dbConnection.getConnection(function(err, connection){
            connection.query(sql, function(err, result) {
                if (err) {
                    res.json({ error: err })
                };
                logger.info("Item updated");
                console.log("Item updated");                
            });
            res.end();
            connection.release();
        });
    });

    /* DELETE item. */
    //app.delete('/api/v1/items/:id', VerifyToken, (req, res) => {     
    app.delete('/api/v1/items/:id', (req, res) => {
        logger.info("DELETE: /api/v1/items/:id");

        console.log(req.userid + "\n");
        req.userid = "A;HJADFHLSEHRJLSDKJHSLFDKJ";

        const body = req.body;
        var sql = "DELETE FROM  dbtantakatu.item WHERE id=" + req.params.id + ";";
        console.log(sql);

        dbConnection.getConnection(function(err, connection){
            connection.query(sql, function(err, result) {
                if (err) {
                    res.json({ error: err })
                };
                logger.info("Item deleted");
                console.log("Item deleted");                
            });
            res.end();
            connection.release();
        });
    });
};