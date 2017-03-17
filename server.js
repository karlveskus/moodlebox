const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const path        = require('path');
const mongoose    = require('mongoose');
const properties  = require('./config/properties');
const port        = properties.port;
const jwt         = require('jsonwebtoken');
const morgan      = require('morgan');

const api = require('./routes/api');


// DATABASE
// =======================================
mongoose.connect(properties.database.src);
mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});



// MIDDLEWARES
// =======================================
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', api);



// ROUTES
// =======================================
app.get('/', (req,res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})



// START THE Server
// =======================================
app.listen(port, function() {
  console.log('Server started on port ' + port);
});
