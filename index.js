const express = require('express');
  const app = express();

const morgan = require('morgan');

let movies = [
    {
        title: 'Tremors',
        genre: 'Sci-fi',
        director: 'Ron Underwood'
    },
    {
        title: 'Aliens'
    },
    {
        title: 'Terminator 2: Judgement Day'
    },
    {
        title: 'Event Horizon'
    },
    {
        title: 'Predator'
    },
    {
        title: 'Predator 2'
    },
    {
        title: 'Starship Troopers'
    },
    {
        title: 'DREDD'
    },
    {
        title: 'The Fifth Element'
    },
    {
        title: 'Demolition Man'
    }
];

//GET requests

app.get('/', (req, res) => {
    res.send('Welcome to MyFlix.');
});

app.get('/movies', (req, res) => {
    res.send('Successful GET request returning all movies to user.');
});

app.get('/movies/:title', (req, res) => {
    res.send('Successful GET request returning a specific movie to user.')
});

app.get('/genre/:genre', (req, res) => {
    res.send('Successful GET request returning a specific genre to user.')
});

app.get('/movies/:title/director', (req, res) => {
    res.send('Successful GET request returning a director to user.');
});

//POST requests

app.post('/users', (req, res) => {
    res.send('Successful POST request allowing a user to register.')
});

app.post('/users/favmovie', (req, res) => {
    res.send('Successful POST request allowing user to add a movie to their favorites.')
});

//PUT request

app.put('/users/:username', (req, res) => {
    res.send('Successful PUT request allowing user to update info.')
});

//DELETE request

app.delete('/users/:username/:movieID', (req,res) => {
    res.send('Successful DELETE request allowing user to deregister.')
});

app.delete('/users/favmovie', (req, res) => {
    res.send('Successful DELETE request allowing user to delete a movie from their favorites list.')
});

//Middlware

app.use(morgan('common'));

app.use(express.static('public'));

// Error-handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong...')
})

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});