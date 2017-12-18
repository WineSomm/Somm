const express = require('express');

const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use((req, res) => {
//   res.setHeader('Content-Type', 'text/plain');
//   res.end(JSON.stringify(req.body, null, 2));
// });

app.use(express.static(`${__dirname}/client`));

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});

app.get('/', (req, res) => {
  res.render('indexPage');
});

app.get('/search', (req, res) => {
  res.send('hi');
});

app.get('/*', (req, res) => {
  res.redirect('/');
});
