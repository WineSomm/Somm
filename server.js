const express = require('express');

const bodyParser = require('body-parser');

const session = require('express-session');

require('dotenv').config();

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

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/client`));

app.use(session({
  secret: 'a4f8071f-c873-4447-8ee2',
  cookie: { maxAge: 2628000000 },
}));

const port = process.env.PORT || 9000;

app.get('/signup', (req, res) => {
  app.use(express.static(`${__dirname}/client/signup`));
  // TODO: Make this work
  res.end();
});

app.post('/signup', (req, res) => {
  const user = new User({
    username: req.username,
    password: req.password,
  });
  user.save((err) => {
    if (err) {
      console.error(err);
    }
  });
  // TODO: Create username on session, send resposne to user
});

app.get('/login', (req, res) => {
  app.use(express.static(`${__dirname}/client/signup`));
  // TODO: Make this work
  res.end();
});

app.post('/login', (req, res) => {
  // TODO: Create username on session, send response to user
});

app.post('/favorite', (req, res) => {
  console.log('hi');
  // TODO: Pull username out of req, save as favorite
  // If the user already has a session open...
  // User.findOne({username: username}, (err, entry) => {
  //   const newFavorites = entry.favorites.split(' ');
  //   newFavorites.push(favorite);
  //   entry.favorites = newFavorites;
  //   entry.save();
  // });
  // Else...
  // Redirect to login page
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
