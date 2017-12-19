const express = require('express');

const bodyParser = require('body-parser');

const session = require('express-session');

// const mongoose = require('mongoose');

// mongoose.connect();

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/client`));

// app.use(session({
//   secret: 'a4f8071f-c873-4447-8ee2',
//   cookie: { maxAge: 2628000000 },
// }));

const port = process.env.PORT || 9000;

app.get('/search', (req, res) => {
  res.send('hi');
});

app.post('/search', (req, res) => {
  res.send('searching');
});

app.post('/signup', (req, res) => {
  console.log(req);
  res.send('hi');
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
