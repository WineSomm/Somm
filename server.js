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
  cookie: { maxAge: 360000000 },
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
    favorites: null,
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
        const newFavorites = JSON.parse(entry.favorites);
        newFavorites.push(favorite);
        entry.set({ favorites: JSON.stringify(newFavorites) });
        entry.save();
      } else {
        entry.set({ favorites: JSON.stringify([favorite]) });
        entry.save((error, updated) => {
          if (error) {
            console.error(error);
          }
        });
      }
      res.end();
    });
  }
});

app.get('/favorite', (req, res) => {
  const username = req.session.username;
  if (!username) {
    res.status(400).send('You have to log in to do that');
  } else {
    User.findOne({username: username}, (err, entry) => {
      if (entry.favorites) {
        res.send(entry.favorites);
      } else {
        res.send('Looks like you haven\'t added any favorites yet!');
      }
    });
  }
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
