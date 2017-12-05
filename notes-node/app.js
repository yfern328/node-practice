console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');


// TESTING lodash functions

console.log(_.isString(true));
console.log(_.isString('Andrew'));

var filteredArray = _.uniq(['Yelstin', 1, 'Yelstin', 1, 2, 3, 4]);
console.log(filteredArray);

//PRACTICE WORK

//Testing node modules

// var user = os.userInfo();
//
// fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`, (err) => {
//   if (err) {
//     console.log('Unable to write to file');
//   }
// });

//Testing module exports in notes.js

// var res = notes.addNote();
//
// console.log(res);

// console.log('Result:', notes.add(9, -2));
