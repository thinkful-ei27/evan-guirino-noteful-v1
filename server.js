'use strict';
const express = require('express');
// Load array of notes
const data = require('./db/notes');

const app = express();

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  
  const query = req.query;
  const searchTerm = query.searchTerm;
  console.log(searchTerm);
  
  const filteredSearch = data.filter(item => {
    console.log(item.title.includes(searchTerm));
   return item.title.includes(searchTerm);
  });

  if (searchTerm === undefined) {
    res.json(data);
  }

  res.json(filteredSearch);
  
});


app.get('/api/notes/:id', (req, res) => {
  const params = req.params;
  const id = params.id;
  const note = data.find(item => item.id === Number(id));
  res.send(note);
})


app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`)  
})
.on('error',  function (err) {
  console.log(err);
});



// INSERT EXPRESS APP CODE HERE...
