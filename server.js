const express = require('express');

const bodyParser = require('body-parser');

const session = require('express-session');

const mongoose = require('mongoose');

const MongoDb = 'mongodb://preston:Catharine73@ds161446.mlab.com:61446/somm';

mongoose.connect(MongoDb, {
  useMongoClient: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Mongoose is connected');
});

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  favorites: String,
});

const User = mongoose.model('User', userSchema);

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/client`));

app.use(session({
  secret: 'a4f8071f-c873-4447-8ee2',
  cookie: { maxAge: 2628000000 },
}));

const port = process.env.PORT || 9000;

app.get('/search', (req, res) => {
  res.send('hi');
});

app.post('/search', (req, res) => {
  res.send('searching');
});

app.get('/signup', (req, res) => {
  const user = new User({
    username: 'Preston',
    password: 'abc',
  });
  user.save((err) => {
    if (err) {
      console.error(err);
    }
  });
  app.use(express.static(`${__dirname}/client/signup`));
  res.end();
});

app.get('/login', (req, res) => {
  app.use(express.static(`${__dirname}/client/signup`));
  res.end();
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
