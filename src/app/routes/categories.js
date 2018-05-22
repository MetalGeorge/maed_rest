/*
CRUD CATEGORIES
*/
const router = require('express').Router();
const mongojs = require('mongojs');

// re direccion de la base de datos
const db = mongojs('tantakatudb', ['categories']);


// router.get('/category', (req, res, next) => {
//   res.send('API here');
// });


//LISTAR - Categoria
router.get("/categories", (req, res, next) => {
  db.categories.find((err, categories) => {
    if(err) throw next(err);
    res.json(categories);
  });
});

//BUSCAR - Categoria
router.get("/categories/:cod", (req, res, next) => {
  db.categories.findOne({cod: req.params.cod}, (err, category) => {
    if (err) return next(err);
    res.json(category);
  });
});
//CREAR - Categoria
router.post("/categories", (req, res, next) => {
  const category = req.body;
  if(!category.name || !(category.isDone + '')){
    res.status(400).json({
      error: 'Bad data'
    });
  }else{
    db.categories.save(category, (err, category) => {
      if(err) return next(err);
      res.json(category);
    });
  }
});

//ELIMINAR - Categoria
router.delete("/categories/:id", (req, res, next) => {
  db.categories.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
});

router.put("/categories/:id", (req, res, next) => {
      const category = req.body;
      const updatecategory = {};
      if(category.isDone){
        updatecategory.isDone = category.isDone;
      }
      if(category.name){
        updatecategory.name = category.name;
      }

      if(!updatecategory)
      {
        res.status(400).json({
          error: 'Bad request'
        });
      }else{
        db.categories.update({_id: mongojs.ObjectId(req.params.id)}, (err, category) => {
          if (err) return next(err);
          res.json(category);
        });
      }
    });

module.exports = router;