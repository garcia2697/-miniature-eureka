const express = require('express');

//sets the port
const app = express();
const PORT = process.env.PORT || 3001;

//imports the routes
const htmlRoutes = require('./routes/htmlRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});