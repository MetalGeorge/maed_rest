const express = require('express');
const logger = require('morgan');

const app = express();

const indexRoutes = require('./routes/index');
const categoriesRoutes = require('./routes/categories');

//settings
app.set('port', process.env.PORT || 3000);
// renderizar archivos ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//middlewares
// app.use(coors);
app.use(logger('dev'));
app.use(express.json());


// routes
app.use(indexRoutes);
app.use('/ttkt/v1', categoriesRoutes);

app.listen(app.get('port'), () => {
  console.log('server on port ', app.get('port'));
});
