var VerifyToken = require('./VerifyToken');
var dbConnection = require('../../config/dbConnection').pool;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var dateFormat = require('dateformat');
var config = require('../../config/config');
var logger = require('../../config/log');
var mysql = require('mysql');

module.exports = app => {
    app.use(function(item, req, res, next) {
        console.log(item);
        res.status(200).send(item);
    });

    /* GET items listing. */
    app.get('/api/v1/items', VerifyToken, (req, res) => {     
        logger.info("GET: /api/v1/items");
        console.log("GET: /api/v1/items");

        console.log("-------------------\n");

        var sql = "";
        var filter = "";
        if (typeof req.query.categoryid != 'undefined'){
            if (filter == "")
                filter = " categoryid = " + req.query.categoryid;
            else
                filter = " AND categoryid = " + req.query.categoryid;
        }
        if (typeof req.query.userid != 'undefined'){
            if (filter == "")
                filter = " userid = '" + req.query.userid + "'";
            else
                filter = " AND userid = '" + req.query.userid + "'";
        }
        if (typeof req.query.name != 'undefined'){
            if (filter == "")
                filter = " name LIKE '%" + req.query.name + "%'";
            else
                filter = " AND name LIKE '%" + req.query.name + "%'";
        }
        if (typeof req.query.state != 'undefined'){
            if (filter == "")
                filter = " state = " + req.query.state;
            else
                filter = " AND state = " + req.query.state;
        }

        var fields = "*";
        if(typeof req.query.fields != 'undefined') {
            fields = req.query.fields;
        }

        var sort = "";
        if(typeof req.query.sort != 'undefined') {
            sort = " ORDER BY " + req.query.sort;
            if(typeof req.query.order != 'undefined') {
                sort += " " + req.query.order;
            }
            console.log(sort);
        }

        var limit = "";
        if(typeof req.query.limit != 'undefined') {
            limit = " LIMIT " + req.query.limit;
        }

        if (filter == "")
            sql = "SELECT " + fields + " FROM dbtantakatu.item " + sort + limit;
        else
            sql = "SELECT " + fields + " FROM dbtantakatu.item WHERE " + filter + sort + limit;

        console.log(sql);

        dbConnection.getConnection(function(err, connection) {
            connection.query(sql, (err, result) => {
                res.json(result);
            });
            connection.release();
        });
    });

    /* GET a item. */
    app.get('/api/v1/items/:id', VerifyToken, (req, res) => {     
        logger.info("GET: /api/v1/items/:id");

        var fields = "*";
        if(typeof req.query.fields != 'undefined') {
            fields = req.query.fields;
        }

        var sql = "SELECT " + fields + " FROM dbtantakatu.item WHERE id=" + req.params.id + ";";
        console.log(sql);

        dbConnection.getConnection(function(err, connection) {
            connection.query(sql, (err, result) => {
                res.json(result);
            });
            connection.release();
        });
    });

    /* POST item creating. */
    app.post('/api/v1/items', VerifyToken, (req, res) => {     
        logger.info("POST: /api/v1/items");

        var publicationDate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

        const body = req.body;
        var sql = "INSERT INTO dbtantakatu.item (categoryid, userid, name, description, price, photo, publicationdate) VALUES (" +
                body.categoryid + ", '" + req.userId + "', '" + body.name +  "', '" + body.description +
                "', " + body.price + ", '" + body.photo + "', '" + publicationDate + "');";
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
    app.put('/api/v1/items/:id', VerifyToken, (req, res) => {     
        logger.info("PUT: /api/v1/items/:id");

        //var sqluser = "SELECT COUNT(*) FROM dbtantakatu.item WHERE userid=" + req.userId + ";";

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
    app.delete('/api/v1/items/:id', VerifyToken, (req, res) => {     
        logger.info("DELETE: /api/v1/items/:id");

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