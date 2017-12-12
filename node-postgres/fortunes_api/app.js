const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const fortunes = require('./data/fortunes');

const app = express();

//bodyParser is middleware that will expose body of incoming request in req.body. Gives access to POST requests.
app.use(bodyParser.json());

app.get('/fortunes', (req, res) => {
  res.json(fortunes);
});

app.get('/fortunes/random', (req, res) => {
  res.json(fortunes[Math.floor(Math.random() * fortunes.length)]);
});

app.get('/fortunes/:id', (req, res) => {
  res.json(fortunes.find(f => f.id == req.params.id));
});

const writeFortunes = (json) => {
  fs.writeFile('./data/fortunes.json', JSON.stringify(json, undefined, 2), err => console.log(err));
};

app.post('/fortunes', (req, res) => {

  const { message, lucky_number, spirit_animal } = req.body;

  const fortune_ids = fortunes.map(f => f.id);

  const new_fortunes = fortunes.concat({
    //take list of ids, find the max, and increment by 1. If undefined, return 0, then add 1
    id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1,
    message,
    lucky_number,
    spirit_animal
  });

  writeFortunes(new_fortunes);

  res.json(new_fortunes);

});

app.put('/fortunes/:id', (req, res) => {
  const { id } = req.params;
  // const { message, lucky_number, spirit_animal } = req.body;

  //maintains reference to original fortunes object, so edits to the reference will modify the original object
  const old_fortune = fortunes.find(f => f.id == id);

  // if (message) old_fortune.message = message;
  // if (lucky_number) old_fortune.lucky_number = lucky_number;
  // if (spirit_animal) old_fortune.spirit_animal = spirit_animal;

  ['message', 'lucky_number', 'spirit_animal'].forEach(key => {
    if (req.body[key]) old_fortune[key] = req.body[key];
  });

  writeFortunes(fortunes);

  res.json(fortunes);
});

module.exports = app;

// curl -H "Content-Type: application/json" -X POST -d '{"message": "Hello", "lucky_number": 5, "spirit_animal": "Dog"}' http://localhost:3000/fortunes
// OR be normal and use Postman
