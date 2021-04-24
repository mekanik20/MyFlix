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
    res.status(200).send('Welcome to MyFlix');
});

app.get('/api/movies', (req, res) => {
    res.send(movies);
});

app.get('/api/movies/:title', (req, res) => {
    res.json(movies.find((movies) => 
    { return movies.title === req.params.movies}));
});

app.get('/api/genre/:genre', (req, res) => {
    res.json(movies.find((genre) => 
    { return movies.genre === req.params.genre}));
});

app.get('/api/movies/:title/director', (req, res) => {
    res.send('director');
});

//POST requests

app.post('/api/users', (req, res) => {
    let newUser = req.body;

    if (newUser.name) {
        const message = 'Missing name in request body';
        res.status(400).send(message);
    } else {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).send(newUser);
    }
});

//PUT request

app.put('/api/users/:username', (req, res) => {
    let user = users.find((user) => { return user.name === req.params.name});

    if (user) {
        user.username[req.params.username] = parseInt(req.params.username);
        res.status(201).send(req.params.username + ' was found successfully' );
    } else {
        res.status(404).send('User ' + req.params.name + 'was not found.');
    }
});

//DELETE request

app.delete('/api/users/:username/:movieID', (req,res) => {
    let user = users.filter((obj) => {return obj.movieID !== req.params.movieID});
    res.status(201).send('User' + req.params.movieID + ' was deleted.');
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