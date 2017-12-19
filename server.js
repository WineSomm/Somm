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

app.use(session({
  secret: 'wiiiiiine',
  cookie: { maxAge: 3600000 },
  saveUninitialized: true,
  resave: true,
  username: null,
}));

app.use(express.static(`${__dirname}/client`));

const port = process.env.PORT || 9000;

app.get('/signup', (req, res) => {
  res.end();
});

app.post('/signup', (req, res) => {
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
        req.session.username = req.body.username;
        req.session.save();
        res.redirect('/');
      });
    }
  });
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
      req.session.username = req.body.username;
      req.session.save();
      res.redirect('/');
    }
  });
});

app.post('/favorite', (req, res) => {
  const favorite = req.body.wine;
  if (!req.session.username) {
    res.send('You need to log in to do that');
  } else {
    const username = req.session.username;
    User.findOne({ username: username }, (err, entry) => {
      if (entry.favorites) {
        const newFavorites = entry.favorites.split(' ');
        newFavorites.push(favorite);
        entry.favorites = newFavorites;
        entry.save();
      } else {
        entry.favorites = favorite;
        entry.save();
      }
      res.end();
    });
  }
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
