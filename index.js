const express = require('express');
  const app = express();

const morgan = require('morgan');

let topMovies = [
    {
        title: 'Tremors'
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

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.get('/', (req, res) => {
    res.send('Top 10 Sci-fi movies');
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