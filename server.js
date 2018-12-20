'use strict';
const express = require('express');
const { PORT } = require('./config');
const morgan = require('morgan');
const notesRouter = require('./routers/notes.routers');


// Load array of notes


const app = express();
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use('/api', notesRouter);





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

