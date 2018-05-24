/*
CRUD CATEGORIES
*/
const router = require('express').Router();
const Category = require('../models/category');
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
router.post("/categories", (req, res) => {
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
    }
  });
});

//READ - Category
router.get("/categories", (req, res) => {
  Category.getCategories((err, data) => {
    res.json(data);
  });
});

//UPDATE - Category
router.put("/categories/:id", (req, res) => {
  const categoryData = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description
  };
  Category.updateCategory(categoryData, (err, data) => {
    if(data && data.msg){
      res.json(data)
    }else{
      res.json({
        success: false,
        "msg": "error"
      })
    }
  })
});

//DELETE - Category
router.delete("/categories/:id", (req, res) => {
  Category.deleteCategory(req.params.id, (err, data) => {    
    if(data && data.msg === 'deleted'){
      res.json({
        success:true,
        data: data
      })
    }else{
      res.status(500).json({
        "msg": "error"
      })
    }
  });
});

module.exports = router;