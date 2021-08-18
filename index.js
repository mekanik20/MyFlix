const mongoose = require('mongoose');
const Models = require('./models.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const morgan = require('morgan');
const passport = require('passport');
require('./passport');
const { check, validationResult } = require('express-validator');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;
const cors = require('cors');
app.use(cors());

//mongoose.connect('mongodb//git.heroku.com/myflixcf.git', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect( process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true});

//Middleware

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

let auth = require('./auth')(app);

check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric();

//GET requests

app.get('/', (req, res) => {
    res.send('Welcome to MyFlix.');
});

app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get('/genre/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Name })
    .then((movie) => {
      res.status(201).json(movie.Genre.Description);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get('/director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
    .then((movie) => {
      res.status(201).json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Get all users

app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Get a user by username

app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//POST request for new/existing user

app.post('/users', [
  check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to valid').isEmail()
  ], (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ erros: errors.array() });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username}) // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) {
      //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
          .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//Add a movie to a user's favorite movies

app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), (req,res) => {
    Users.findOneAndUpdate({ Username: req.params.Username}, {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//PUT request, Update a user's info by username

app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username}, 
   { $set:
    {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
    }
  },
  { new:true }, 
  (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
          res.json(updatedUser);
      }
  });
});

//Delete a user by username

app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username})
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + 'was not found');
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
    }})
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Remove a movie from a user's favorite movies list

app.delete('/users/:Username/FavoriteMovies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $pull: { FavoriteMovies: req.params.MovieID }
   },
   { new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Error-handling

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong...')
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});

//mongoexport --db databaseName --collection collName --out /C:\Users\Rob\Desktop\Coding\MongoDB\exported_collections/users.json
//mongoimport --uri mongodb+srv://mekanik20:Dodgeneonsrt4@myflixdb.zksas.mongodb.net/myFlixDB --collection movies --type json --file ../exported_collections/myFlixMovies.json
//mongoimport --uri mongodb+srv://MikeH:Dodgeneonsrt4@myflixdb.aolqv.mongodb.net/myFlixDB --collection users --type json --file users.json
//mongo "mongodb+srv://myflixdb.aolqv.mongodb.net/myFlixDB" --username MikeH --password Dodgeneonsrt4