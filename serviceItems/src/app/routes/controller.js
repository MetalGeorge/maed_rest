var VerifyToken = require('./VerifyToken');
var dbConnection = require('../../config/dbConnection').pool;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var dateFormat = require('dateformat');
var config = require('../../config/config');
var logger = require('../../config/log');
var mysql = require('mysql');
var fileUpload = require('express-fileupload')

module.exports = app => {
    /*
    app.use(function(item, req, res, next) {
        console.log(item);
        res.status(200).send(item);
    });
    */

    /* GET items listing. */
    app.get('/api/v1/items', VerifyToken, (req, res) => {     
        logger.info("GET: /api/v1/items");
        console.log("GET: /api/v1/items");
        
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
    app.get('/api/v1/items/:id', VerifyToken, (req, res) => {     
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
    app.post('/api/v1/items', VerifyToken, (req, res) => {     
        logger.info("POST: /api/v1/items");

        var publicationDate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        console.log(req);
        const body = req.body;
        var sql = "";
        if (body.photo)
        {
            var file = req.files.uploaded_image;
            var img_name = file.name;
            if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" )
            {
              file.mv('images/'+file.name, function(err) {
                             
               if (err)
 
                 return res.status(500).send(err);
                });
            };

             sql = "INSERT INTO dbtantakatu.item (categoryid, userid, name, description, price, photo, publicationdate) VALUES (" +
                body.categoryid + ", '" + req.userId + "', '" + body.name +  "', '" + body.description +
                "', " + body.price + ", '" + img_name + "', '" + publicationDate + "');";
            console.log(sql);
        }
        else 
        {
            sql = "INSERT INTO dbtantakatu.item (categoryid, userid, name, description, price, publicationdate) VALUES (" +
                body.categoryid + ", '" + req.userId + "', '" + body.name +  "', '" + body.description +
                "', " + body.price + ", '" + publicationDate + "');";
            console.log(sql);
        }
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
        var sql = "DELETE FROM dbtantakatu.item WHERE id=" + req.params.id + ";";
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

        
    app.patch('/api/v1/items/', VerifyToken, (req, res) => {
    //app.patch('/api/v1/items/', (req, res) => {
        //console.log(req);
         const body = req.body;
        logger.info("Begin purchase item");
        // validate that userid and item to buy is not the same
        // validate that the item's status is "On Sale"
        var sqlCheckItem = "SELECT userid, state FROM dbtantakatu.item WHERE id = "+ body.itemId + ";"

        var itemUserId = "";
        var itemState = -1;

        dbConnection.getConnection(function(err, connection) {
            connection.query(sqlCheckItem, function(err, result) {
                if (err) {
                    res.json({ error: err })
                };
                console.log(result);
                itemUserId = result[0].userid;
                itemState  = result[0].state;
                console.log("Item user id " + itemUserId);
                console.log("Buyer user id " + req.userId);

                if (itemUserId == req.userId)
                {
                    console.log("Buyer and Seller are the same");
                    res.end();
                    connection.release();
                }
                else if (itemState == 0)
                {
                    console.log("Item is already sold !");
                    res.end();
                    connection.release();
                }
                else
                {
                 var sqlPurchase = "INSERT INTO dbtantakatu.purchase (ItemId, UserId, purchaseDate) VALUES (" + body.itemId + ", '" + req.userId + "', NOW());";
                        console.log(sqlPurchase);
                        var sqlUpdateItem = "UPDATE dbtantakatu.item SET state = 0 WHERE id = "+ body.itemId + ";";
                        console.log(sqlUpdateItem);
                        dbConnection.getConnection(function(err, connection) {
                            connection.query(sqlPurchase, function(err, result) {
                                if (err) {
                                    res.json({ error: err })
                                };
                                console.log("purchase performed");
                                logger.info("purchase performed");
                            });
                            connection.query(sqlUpdateItem, function(err, result) {
                                if (err) {
                                    res.json({ error: err })
                                };
                                console.log("purchase performed");
                                logger.info("purchase performed");
                            });            
                            res.end();
                            connection.release();
                        });
                };

            });
    
        logger.info("End purchase perform");

        });
    });
};