const express = require('express');


// sets the heroku port conversion
const app = express();
const PORT = process.env.PORT || 3001;

// connects the route files
const htmlRoutes = require('./routes/htmlRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Use Routes
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);



// chains the listen method to the app variable
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});


