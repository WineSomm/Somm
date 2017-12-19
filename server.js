const express = require('express');

const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/client`));

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});

app.get('/search', (req, res) => {
  res.send('hi');
});

app.post('/search', (req, res) => {
  res.send('searching');
});
