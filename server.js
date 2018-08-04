const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const session = require('express-session');
const dbc = require('./database-config');
const api = require('./api-config');
const maps = require('./maps-config');
const helpers = require('./helpers');

require('dotenv').config();

const mongoose = require('mongoose');

const MongoDb = dbc.DB_TOKEN;

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

app.put('/favorite', (req, res) => {
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
    res.status(400).send('You have to be logged in to load your favorites');
  } else {
    User.findOne({username: username}, (err, entry) => {
      if (entry.favorites) {
        res.send(entry.favorites);
      } else {
        res.send('Looks like you haven\'t added any favorites yet');
      }
    });
  }
});

app.delete('/favorite', (req, res) => {
  const id = JSON.parse(req.query.body).id;
  const username = req.session.username;
  User.findOne({ username: username }, (err, entry) => {
    const newFavorites = JSON.parse(entry.favorites);
    newFavorites.forEach((item, index) => {
      if (item.id === id) {
        newFavorites.splice(index, 1);
      }
    });
    entry.set({ favorites: JSON.stringify(newFavorites) });
    entry.save((error, updated) => {
      if (error) {
        console.error(error);
      }
    });
    res.status(204).send();
  });
});

app.post('/search', (req, res) => {
  const query = req.body.wine;
  axios.get('http://api.snooth.com/wines', {
    params: {
      akey: api.API_TOKEN,
      q: query,
      n: req.body.hits || 25,
    },
  })
    .then((response) => {
      res.status(200).send(response.data.wines);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send();
    });
});

app.post('/recipes', (req, res) => {
  const query = req.body.mealPreference;
  axios.get(`https://api.edamam.com/search?q=${query}&app_id=${api.EDAMAM_ID}&app_key=${api.EDAMAM_TOKEN}`)
    .then((response) => {
      res.status(200).send(response.data.hits);
    })
    .catch((err) => {
      console.error(err);
      res.status(404);
    });
});

app.post('/online', (req, res) => {
  res.redirect('/');
});

app.get('/local', (req, res) => {
  axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${maps.MAPS_TOKEN}`, {})
  .then((response) => {
  return response.data.location;
  })
  .then((location) => {
  return axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Wine%20Store&inputtype=textquery&fields=photos,price_level,formatted_address,name,rating,opening_hours,geometry&locationbias=circle:2000@${location.lat},${location.lng}&key=${maps.MAPS_TOKEN}`)
  })
  .then((response) => {
    // console.log(response.data.candidates[0].geometry.location);
    // console.log(response.data);      
    return response.data;
  })
  .then(response => res.send(response))
  .catch(err => console.error(err));
});

app.post('/local', (req, res) => {
  axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${maps.MAPS_TOKEN}`, {})
  .then((response) => {
  return response.data.location;
  })
  .then((location) => {
  return axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Wine%20Store&inputtype=textquery&fields=photos,price_level,formatted_address,name,rating,opening_hours,geometry&locationbias=circle:2000@${location.lat},${location.lng}&key=${maps.MAPS_TOKEN}`)
  })
  .then((response) => {
    console.log(response.data.candidates[0].photos[0].photo_reference);      
    return response.data.candidates[0].photos[0].photo_reference;
  })
  .then((photoRef) => {
    return axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${maps.MAPS_TOKEN}`)
  })
  .then((response) => {
    return response.data;
  })
  .then((pic) => {
    res.send(pic);
  })
  .catch(err => console.error(err));
})

app.post('/buy', (req, res) => {
  console.log(req.body.wine, 'console.log(req.body.wine)');
  const query = req.body.wine;
  axios.get(`http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=SenaiAya-Senaix27-PRD-fed5cedf3-d88f47f1&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${query}&paginationInput.entriesPerPage=10&descriptionSearch=true`)
    .then((response) => {
      console.log(response.data, 'response.data');
      res.send(response.data);
      res.status(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send();
    });
});

const PostSchema = mongoose.Schema({
  title: String,
  body: { type: String, required: true },
  posted: { type: Date, default: Date.now },
});

const PostModel = mongoose.model('PostModel', PostSchema);


function createPost(req, res) {
  const post = req.body;
  console.log(post, 'hello from server');
  PostModel
    .create(post)
    .then((postObject) => {
      // res.json(200);
    })
    .catch((error) => {
      console.error(error);
    });
  res.json(post);
}

function getpost(req, res) {
  PostModel
    .find()
    .then((allposts) => {
      res.json(allposts);
    })
    .catch((error) => {
      console.error(error);
      res.send(400);
    });
}

function deletePost(req, res) {
  const postId = req.params.id;
  PostModel
    .remove({ _id: postId })
    .then((success) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getPostById(req, res) {
  const postId = req.params.id;
  PostModel
    .findById(postId)
    .then((post) => {
      res.json(post);
    })
    .catch((error) => {
      console.error(error);
    });
}

function updatepost(req, res) {
  let postId = req.params.id;
  let post = req.body;
  console.log(postId, 'postId');
  console.log(post, 'post');
  PostModel
    .update({ _id: postId }, {
      title: post.title,
      body: post.body,
    })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

app.post('/forum', createPost);

app.get('/forum', getpost);

app.delete('/forum/:id', deletePost);

app.get('/forum/:id', getPostById);

app.put('/forum/:id', updatepost);

app.get('/logout', helpers.logoutUser);

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
