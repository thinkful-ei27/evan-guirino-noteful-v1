'use strict';
const express = require('express');
// Load array of notes
const data = require('./db/notes');

const app = express();

app.use(express.static('public'))
app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`)  
})
.on('error',  function (err) {
  console.log(err);
});


// INSERT EXPRESS APP CODE HERE...
