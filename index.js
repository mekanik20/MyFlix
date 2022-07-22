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

//Connect to local db--
//mongoose.connect('mongodb//git.heroku.com/myflixcf.git', {useNewUrlParser: true, useUnifiedTopology: true});

//Connect to hosted db--
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//Middleware
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

//Import cors
const cors = require('cors');
app.use(cors());

let auth = require('./auth')(app);

check('Password', 'Password contains non-alphanumeric characters - not allowed.').isAlphanumeric();

//GET requests

/**
 * GET: Returns welcome message for '/' request URL
 * @returns Welcome message
 */
app.get('/', (req, res) => {
  res.send('Welcome to MyFlix.');
});

/**
 * GET: Returns a list of ALL movies to the user
 * Request body: Bearer token
 * @returns array of movie objects
 * @requires passport
 */
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

/**
 * GET: Returns data about a single movie by title to the user
 * Request body: Bearer token
 * @param movieId
 * @returns movie object
 * @requires passport
 */
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

/**
 * GET: Returns data about a genre by name/title
 * Request body: Bearer token
 * @param Name (genre)
 * @returns genre object
 * @requires passport
 */
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

/**
 * GET: Returns data about a director by name
 * Request body: Bearer token
 * @param Name (director)
 * @returns director object
 * @requires passport
 */
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

/** 
 * GET: Returns a list of ALL users
 * Request body: Bearer token
 * @returns array of user objects
 * @requires passport
 */
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

/**
 * GET: Returns data on a single user by username
 * Request body: Bearer token
 * @param Username
 * @returns user object
 * @requires passport
 */
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

/**
 * POST: Allows new users to register
 * Request body: Bearer token
 * @returns user object
 */
app.post('/users', [
  check('Username', 'Username is required').isLength({ min: 5 }),
  check('Password', 'Password contains non alphanumeric characters - not allowed').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to valid').isEmail()
], (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ erros: errors.array() });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
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
          .then((user) => {
            res.status(201).json(user);
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

/**
 * POST: Allows users to add a movie to their list of favorites
 * Request body: Bearer token
 * @param username
 * @param movieId
 * @returns user object
 * @requires passport
 */
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
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

/**
 * PUT: Allow users to update their user info
 * Request body: Bearer token, updated user info
 * @param Username
 * @returns user object with updates
 * @requires passport
 */
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    {
      $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
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

/**
 * DELETE: Allows existing users to deregister
 * Request body: Bearer token
 * @param Username
 * @returns success message
 * @requires passport
 */
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + 'was not found');
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * DELETE: Allows users to remove a movie from their list of favorites
 * Request body: Bearer token
 * @param Username
 * @param movieId
 * @returns user object
 * @requires passport
 */
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

/**
 * Error-handling
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong...')
});

/**
 * defines port
 */
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});

//mongoexport --db databaseName --collection collName --out /C:\Users\Rob\Desktop\Coding\MongoDB\exported_collections/users.json
//mongoimport --uri mongodb+srv://mekanik20:Dodgeneonsrt4@myflixdb.zksas.mongodb.net/myFlixDB --collection movies --type json --file ../exported_collections/myFlixMovies.json
//mongoimport --uri mongodb+srv://MikeH:Dodgeneonsrt4@myflixdb.aolqv.mongodb.net/myFlixDB --collection users --type json --file users.json
//mongo "mongodb+srv://myflixdb.aolqv.mongodb.net/myFlixDB" --username MikeH --password Dodgeneonsrt4