const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const port = config.port;

// Database connection
mongoose.connect(config.database.src);
mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/', (req,res) => {
  res.sendFile(__dirname + "/index.html");
});


app.listen(port, function() {
  console.log('Server started on port ' + port);
});
