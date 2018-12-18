'use strict';
const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// notes.filter('government', (err, list) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(list);
// });

// notes.find (1005, (err, item) => {
//   if (err) {
//     console.log(err);
//   }
//   if (item) {
//     console.log(item);
//   } else {
//     console.log('Not found');
//   }
// });

// const updateObj = {
//   title: 'New Title',
//   content: 'Blah'
// }

// notes.update(1005, updateObj, (err, item) => {
//   if (err) {
//     console.log(err);
//   } 

//   if (item) {
//     console.log(item);
    
//   } else console.log('not found');
// })

notes.create({title: 'My new note'}, (err, item) => {
  if (err) {
    console.log(err);
  } 
  console.log(item);
})

notes.delete('1008', (err, item) => {
  if (err) {
    console.log(err);
  }
  console.log(item);
  console.log(notes);
});

