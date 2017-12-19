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

app.set('view engine', 'jade');

app.use(express.static(`${__dirname}/client`));

app.use(session({
  secret: 'a4f8071f-c873-4447-8ee2',
  cookie: { maxAge: 2628000000 },
}));

const port = process.env.PORT || 9000;

app.get('/signup', (req, res) => {
  res.end();
});

app.post('/signup', (req, res) => {
  console.log(req.body);
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  User.findOne({ username: user.username }, (err, entry) => {
    if (entry) {
      res.send('Already found');
    } else {
      user.save((error) => {
        if (error) {
          console.error(error);
        }
        res.redirect('/');
      });
    }
  });
  // TODO: Create username on session, send resposne to user
});

app.get('/login', (req, res) => {
  res.end();
});

app.post('/login', (req, res) => {
  User.findOne({ username: req.body.username, password: req.body.password }, (err, entry) => {
    if (err) {
      console.error(err);
      res.writeHead(400);
      res.end('Sorry, there was a problem with your username or password');
    } else if (entry) {
      res.redirect('/');
    }
  });
});

app.post('/favorite', (req, res) => {
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

app.get('/favorite', (req, res) => {
  // TODO: pull username out of request
  // User.findOne({username: username}, (err, entry) => {
  //   const splitFavorites = entry.favorites.split(' ');
  //   res.send(splitFavorites);
  // });
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
