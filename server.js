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


app.startServer = function (port) {
  return new Promise((resolve, reject) => {
    this.listen(port, function () {
      this.stopServer = require('util').promisify(this.close);
      resolve(this);
    }).on('error', reject);
  });
};

if (require.main === module) {
  app.startServer(PORT).catch(err => {
    if (err.code === 'EADDRINUSE') {
      const stars = '*'.repeat(80);
      console.error(`${stars}\nEADDRINUSE (Error Address In Use). Please stop other web servers using port ${PORT}\n${stars}`);
    }
    console.error(err);
  });
}



module.exports = app;