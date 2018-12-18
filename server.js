'use strict';
const express = require('express');
const { PORT } = require('./config');
const { logger } = require('./middleware/logger')

// Load array of notes
const data = require('./db/notes');

const app = express();

app.use(express.static('public'));
app.use(logger);

app.get('/api/notes', (req, res) => {
  
  const query = req.query;
  const searchTerm = query.searchTerm;
  
  const filteredSearch = data.filter(item => {
    return item.title.includes(searchTerm);
  });

  searchTerm ? res.json(filteredSearch) : res.json(data);

  
  
});

app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.get('/api/notes/:id', (req, res) => {
  const params = req.params;
  const id = params.id;
  const note = data.find(item => item.id === Number(id));
  res.send(note);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.use((req,res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({message: 'Not Found'});
})

app.listen(PORT, function () {
  console.info(`Server listening on ${PORT}`);
})
  .on('error',  function (err) {
    console.log(err);
  });

 