const dbConnection = require('../../config/dbConnection').pool;

let categoryModel = {};

categoryModel.getCategories = (callback) => {
  if (dbConection) {
    dbConection.query('SELECT * FROM category ORDER BY id', (err, rows) => {
      if(err){
        throw err;
      }else{
        callback(null, rows);
      }
    });
  }
};

module.exports = categoryModel;