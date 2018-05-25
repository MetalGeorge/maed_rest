const dbConnection = require('../../config/dbConnection').pool;

let categoryModel = {};

categoryModel.getCategories = (callback) => {
  if (dbConnection) {
    dbConnection.query('SELECT * FROM category ORDER BY id', (err, rows) => {
      if(err){
        throw err;
      }else{
        callback(null, rows);
      }
    });
  }
};

categoryModel.insertCategory = (categoryData, callback) => {
  if(dbConnection){
    dbConnection.query('INSERT INTO category SET ?', categoryData, (err, result) => {
      if(err){
        throw err;
      }else{
        callback(null, {
          insertId: result.insertID
        })
      }
    })
  }
};

categoryModel.updateCategory = (categoryData, callback) => {
  if (dbConnection) {

    const sql = `
      UPDATE category SET
      name = ${dbConnection.escape(categoryData.name)},
      description = ${dbConnection.escape(categoryData.description)}
      WHERE id = ${dbConnection.escape(categoryData.id)}
      `
    dbConnection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        callback(null, {
          "msg": "success" 
        })
      }
    })
  }
};

categoryModel.deleteCategory = (id, callback) => {
  if(dbConnection){
    let sql = `SELECT * FROM category WHERE id = ${dbConnection.escape(id)}`;

    dbConnection.query(sql, (err, row) => {
      if(row){
        let sql = `DELETE FROM category WHERE id = ${dbConnection.escape(id)}`;
        dbConnection.query(sql, (err, resul) => {
          if(err){
            throw err;
          }else{
            callback(null, {
              "msg": "deleted"
            })
          }
        })
      }else{
        callback(null, {
          "msg": "not exist"
        })
      }
    })
  }
};

// const querystring = require('querystring');
// const sometext = querystring.parse('name=algo&lastname=mas')
// const sometext = querystring.stringify({'name'='algo', 'lastname'= 'mas'})
// console.log(sometext);

// categoryModel.searchCategory =

module.exports = categoryModel;