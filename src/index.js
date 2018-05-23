const express = require('express');

const app = express();

const categoriesRoutes = require('./app/routes/categoryRoutes');

//settings
app.set('port', process.env.PORT || 3000);

//middlewares

app.use(express.json());


// routes
app.use('/ttkt/v1', categoriesRoutes);

app.listen(app.get('port'), () => {
  console.log('server on port ', app.get('port'));
});
