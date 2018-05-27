/*
CRUD CATEGORIES
*/
const router = require('express').Router();
const Category = require('../models/category');
const VerifyToken = require('./VerifyToken');

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../../config/config');
let logger = require('../../config/log');

/*
//SEARCH - Categoria
router.get("/categories/:id", (req, res, next) => {
  dbConnection.getConnection((err, connection) => {
    connection.query("SELECT * FROM dbideas.category WHERE id='$id'", (err, result) => {
      res.json(result);
    });
    connection.release();
  });
});
*/

//CREATE - Category
router.post("/categories", VerifyToken, (req, res) => {
  logger.info("Begin insert category");
  const categoryData = {
    id:null,
    name: req.body.name,
    description: req.body.description
  };
  Category.insertCategory(categoryData, (err, data) =>{
    if(data && data.insertCategory){
      res.json({
        success: true,
        data: data
      })
      logger.info("Category inserted");
    }
  });
  logger.info("End insert category");
});

//READ - Category
router.get("/categories", VerifyToken, (req, res) => {
  logger.info("Begin list category");
  Category.getCategories((err, data) => {
    res.json(data);
  });
  logger.info("End list category");
});

//UPDATE - Category
router.put("/categories/:id", VerifyToken, (req, res) => {
  logger.info("Begin update category");
  const categoryData = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description
  };
  Category.updateCategory(categoryData, (err, data) => {
    if(data && data.msg){
      res.json(data)
      logger.info("Category updated");
    }else{
      res.json({
        success: false,
        "msg": "error"
      })
      logger.info("The category was not updated");
    }
  })
  logger.info("End update category");
});

//DELETE - Category
router.delete("/categories/:id", VerifyToken, (req, res) => {
  logger.info("Begin delete category");
  Category.deleteCategory(req.params.id, (err, data) => {    
    if(data && data.msg === 'deleted'){
      res.json({
        success:true,
        data: data
      })
      logger.info("Category deleted");
    }else{
      res.status(500).json({
        "msg": "error"
      })
      logger.info("The category was not deleted");
    }
  });
  logger.info("End delete category");
});

module.exports = router;