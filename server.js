'use strict';
const express = require('express');
const { PORT } = require('./config');
const { logger } = require('./middleware/logger');


// Load array of notes
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);

const app = express();
app.use(logger);
app.use(express.static('public'));
app.use(express.json());


app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;


  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }

    res.json(list);
  });
});

app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  
  notes.find(Number(id), (err, note) => {
    if (err) {
      next(err);
    }

    res.json(note);
  });
});

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  const updateObj = { "title": "12 things lady gaga has in common with cats",
  "content": "Posuere sollicitudin aliquam..."};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
    console.log(req.body)
    console.log(updateObj)
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});



app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});



app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
})

app.listen(PORT, function () {
  console.info(`Server listening on ${PORT}`);
})
  .on('error', function (err) {
    console.log(err);
  });

