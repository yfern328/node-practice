const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const fortunes = require('./data/fortunes');

const app = express();

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

app.post('/fortunes', (req, res) => {
  console.log(req.body)

  const { message, lucky_number, spirit_animal } = req.body;

  const fortune_ids = fortunes.map(f => f.id);

  const fortune = {
    id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1,
    message,
    lucky_number,
    spirit_animal
  };

  const new_fortunes = fortunes.concat(fortune);

  fs.writeFile('./data/fortunes.json', JSON.stringify(new_fortunes, undefined, 2), err => console.log(err));

  res.json(new_fortunes);

});

module.exports = app;

// curl -H "Content-Type: application/json" -X POST -d '{"message": "Hello", "lucky_number": 5, "spirit_animal": "Dog"}' http://localhost:3000/fortunes
