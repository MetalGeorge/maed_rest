/*
CRUD CATEGORIES
*/
const router = require('express').Router();
const dbConnection = require('../../config/dbConnection').pool;

//BUSCAR - Categoria
router.get("/categories/:id", (req, res, next) => {
  dbConnection.getConnection((err, connection) => {
    connection.query("SELECT * FROM dbideas.category WHERE id='$id'", (err, result) => {
      res.json(result);
    });
    connection.release();
  });
});

//CREATE - Category
router.post("/categories", (req, res, next) => {
  const {category} = req.body;
  var sql = "INSERT INTO dbideas.category (id, name, description) VALUES('" + req.id + "', '" + req.name + "', 0,'" + req.description + "');";
  
  dbConnection.getConnection((err, connection) =>{
    connection.query(sql, (err, result) =>{
      if (err) {
        res.json({
          error: err
        })
      };
    });
    res.end();
    connection.release();
  });
});

//READ - Category
router.get("/categories", (req, res, next) => {
  dbConnection.getConnection((err, connection) => {
    connection.query('SELECT * FROM dbideas.category ORDER BY id', (err, result) => {
      res.json(result);
    });
    connection.release();
  });
});

//UPDATE - Category
router.put("/categories/:id", (req, res, next) => {
  const category = req.body;
  const updatecategory = {};
  if (category.isDone) {
    updatecategory.isDone = category.isDone;
  }
  if (category.name) {
    updatecategory.name = category.name;
  }

  if (!updatecategory) {
    res.status(400).json({
      error: 'Bad request'
    });
  } else {
    var sql = "UPDATE dbideas.category SET name = {req.name}, description = {req.description}  WHERE id = {req.id};";

    dbConnection.getConnection((err, connection) => {
      connection.query(sql, (err, result) => {
        if (err) {
          res.json({
            error: err
          })
        };
      });
      res.end();
      connection.release();
    });
  }

});

//DELETE - Category
router.delete("/categories/:id", (req, res, next) => {
  db.categories.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
  
  var sql = "DELETE FROM dbideas.category WHERE id =  " + req.params.id;
  
  dbConnection.getConnection((err, connection) => {
    connection.query(sql, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      };
    });
    sql = "DELETE FROM dbideas.product WHERE idProduct =  " + req.params.id;
    connection.query(sql, (err, result) => {
      if (err) {
        res.json({
          error: err
        })
      };
    });
    res.end();
    connection.release();
  });
});

module.exports = router;