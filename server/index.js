const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const request = require('request');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use('/', express.static('public'));

app.get('/', (req, res) => {
  request('http://127.0.0.1:1234', (error, response, body) => {
    if (error) {
      console.log('Error:', error);
    } else {
      res.json(JSON.parse(body));
    };
  });
});

const PORT = 1234;
app.listen(PORT, () => {
  console.log('App is listening on port:', PORT);
});