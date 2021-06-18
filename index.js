const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});

const bodyParser = require('body-parser');
const express = require('express');
  const app = express();
  app.use(bodyParser.json());

const morgan = require('morgan');

let movies = [
    {
        _id: ObjectId("60aea0209da56eb7f8cf3a3c"),
        Title: "Tremors",
        Genre: { 
            Name: "Horror",
            Description: "Horror is a genre of speculative fiction which is intended to frighten, scare, or disgust."
        },
        Director: {
            Name: "Ron Underwood",
            Bio: "Ronald Brian Underwood is director who is equally adept at working in television as well as features, Southern California native Ron Underwood has been making films since 5th grade and was winning Eastman Kodak filmmaking awards by the time he was in his teens.",
            Birth: "1953-11-06",
            Death: ""
        },
        Description: "A small town gradually becomes aware of a strange creature which picks off people one by one. But what is this creature, and where is it? At the same time, a seismologist is working in the area, she detects _tremors_. The creature lives underground, and can \"pop up\" without warning. Trapped in their town, the town-folk have no escape.",
        imageURL: "https://m.media-amazon.com/images/M/MV5BMTEzNjkwMzIyMjZeQTJeQWpwZ15BbWU4MDI2NTU5ODYx._V1_UX182_CR0,0,182,268_AL_.jpg"
    },
    {
        _id: ObjectId("60aea0209da56eb7f8cf3a3d"),
        Title: "Aliens",
        Genre: { 
            Name: "Sci-fi",
            Description: "Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life."
        },
        Director: {
            Name: "James Cameron",
            Bio: "James Cameron is a critically acclaimed film director known for some of the biggest box-office hits of all time. A science-fiction fan as a child, he went on to produce and direct films including The Terminator, Aliens and Avatar. He has received numerous Academy Awards and nominations for his often large-scale, expensive productions. His most noted work, 1997's Titanic, became the first film to earn more than $1 billion and landed 14 Academy Award nominations. Cameron took home three Oscars himself for the project: Best Director, Best Film Editing and Best Picture.",
            Birth: "1954-08-16",
            Death: "",
        },
        Description: "It is the sequel to the 1979 science fiction horror film Alien, and the second film in the Alien franchise. Set in the far future, the film stars Sigourney Weaver as Lieutenant Ellen Ripley, the sole survivor of an alien attack on her ship. When communications are lost with a human colony on the moon on which her crew first encountered the alien creatures, Ripley agrees to return to the site with a troop of colonial marines to investigate.",
        imageURL: "https://m.media-amazon.com/images/M/MV5BZGU2OGY5ZTYtMWNhYy00NjZiLWI0NjUtZmNhY2JhNDRmODU3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg"
    },
    {
        _id: ObjectId("60aea0209da56eb7f8cf3a3e"),
        Title: "Terminator 2 Judgement Day",
        Genre: { 
            Name: "Sci-fi",
            Description: "Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life."
        },         
        Director: {
            Name: "James Cameron",
            Bio: "James Cameron is a critically acclaimed film director known for some of the biggest box-office hits of all time. A science-fiction fan as a child, he went on to produce and direct films including The Terminator, Aliens and Avatar. He has received numerous Academy Awards and nominations for his often large-scale, expensive productions. His most noted work, 1997's Titanic, became the first film to earn more than $1 billion and landed 14 Academy Award nominations. Cameron took home three Oscars himself for the project: Best Director, Best Film Editing and Best Picture.",
            Birth: "1954-08-16",
            Death: "",
        },
        Description: "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten year old son, John Connor, from a more advanced and powerful cyborg.",
        imageURL: "https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg"
    },
    {
        _id: ObjectId("60aea0209da56eb7f8cf3a3f"),
        Title: "Event Horizon",
        Genre: { 
            Name: "Horror",
            Description: "Horror is a genre of speculative fiction which is intended to frighten, scare, or disgust."
        },
        Director: {
            Name: "Paul W.S. Anderson",
            Bio: "Paul William Scott Anderson is a British film director, producer, and screenwriter who regularly works in science fiction films and video game adaptations.",
            Birth: "1965-03-04",
            Death: "",
        },
        Description: "A rescue crew investigates a spaceship that disappeared into a black hole and has now returned...with someone or something new on-board.",
        imageURL: "https://m.media-amazon.com/images/M/MV5BZGI0NDMwNjAtNGEzNC00MzA1LTlkMjQtYjBkYTZlZjAyZWEyXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg"
    },
    {
        _id: ObjectId("60aea0209da56eb7f8cf3a40"),
        Title: "Predator",
        Genre: { 
            Name: "Action",
            Description: "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases."
        },
        Director: {
            Name: "John McTiernan",
            Bio: "John Campbell McTiernan Jr. is an American filmmaker. He is best known for his action films, especially Predator, Die Hard, and The Hunt for Red October. ",
            Birth: "1951-01-08",
            Death: "",
        },
        Description: "A team of commandos on a mission in a Central American jungle find themselves hunted by an extraterrestrial warrior.",
        imageURL: "https://m.media-amazon.com/images/M/MV5BY2QwYmFmZTEtNzY2Mi00ZWMyLWEwY2YtMGIyNGZjMWExOWEyXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_UX182_CR0,0,182,268_AL_.jpg"
    },
    {
        _id: ObjectId("60aea0209da56eb7f8cf3a41"),
        Title: "Dumb and Dumber",
        Genre: { 
            Name: "Comedy",
            Description: "A film whose main purpose is to amuse and induce laughter, comedy deals with the preposterous and absurd aspects of human behavior with a sense of humor."
        },
        Director: {
            Name: "Peter Farrelly",
            Bio: "Peter John Farrelly is an American film director, screenwriter, producer and novelist.",
            Birth: "1956-12-17",
            Death: ""
        },
        Description: "After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend set out on a hilarious cross-country road trip to Aspen to return it.",
        imageURL: "https://m.media-amazon.com/images/M/MV5BZDQwMjNiMTQtY2UwYy00NjhiLTk0ZWEtZWM5ZWMzNGFjNTVkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UY268_CR0,0,182,268_AL_.jpg"
    },
    {
        _id: ObjectId("60aea0209da56eb7f8cf3a42"),
        Title: "Starship Troopers",
        Genre: { 
            Name: "Sci-fi",
            Description: "Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life."
        },
        Director: {
            Name: "Paul Verhoeven",
            Bio: "Paul Verhoeven is a Dutch director, screenwriter, and film producer active in both the Netherlands and Hollywood. His blending of graphic violence and sexual content with social satire are trademarks of both his drama and science fiction films.",
            Birth: "1938-07-18",
            Death: ""
        },
        Description: "Humans in a fascist, militaristic future wage war with giant alien bugs.",
        imageURL: "https://m.media-amazon.com/images/M/MV5BNWExNzg3MmMtYjc3MS00MzFlLWJiOWQtNWYxZTgxNjhlZTQ2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg"
    },
    {
        _id: ObjectId("60aea0209da56eb7f8cf3a43"),
        Title: "DREDD",
        Genre: {
            Name: "Action",
            Description: "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases."
        },
        Director: {
            Name: "Pete Travis",
            Bio: "Pete Travis is an English television and film director. His work includes Cold Feet, The Jury and Omagh for television and Vantage Point, Endgame and Dredd for cinema.",
            Birth:"",
            Death:""
        },
        Description: "In a violent, futuristic city where the police have the authority to act as judge, jury and executioner, a cop teams with a trainee to take down a gang that deals the reality-altering drug, SLO-MO.",
        imageURL: "https://m.media-amazon.com/images/M/MV5BODkyNDQzMzUzOF5BMl5BanBnXkFtZTcwODYyMDEyOA@@._V1_UX182_CR0,0,182,268_AL_.jpg"
    },
    {
        _id: ObjectId("60aea0209da56eb7f8cf3a44"),
        Title: "The Fifth Element",
        Genre: {
            Name: "Action",
            Description: "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases."
        },
        Director: {
            Name: "Luc Besson",
            Bio:"Luc Paul Maurice Besson is a French film director, screenwriter, and producer.",
            Birth:"1959-03-18",
            Death:""
        },
        Description: "In the colorful future, a cab driver unwittingly becomes the central figure in the search for a legendary cosmic weapon to keep Evil and Mr. Zorg at bay.",
        imageURL: "https://m.media-amazon.com/images/M/MV5BZWFjYmZmZGQtYzg4YS00ZGE5LTgwYzAtZmQwZjQ2NDliMGVmXkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_UY268_CR2,0,182,268_AL_.jpg"
    },
    {
        _id: ObjectId("60aea0209da56eb7f8cf3a45"),
        Title: "Demolition Man",
        Genre: {
            Name: "Action",
            Description: "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases."
        },
        Director: {
            Name: "Marco Brambilla",
            Bio: "Marco Brambilla is an Italian-born Canadian film director and video artist.",
            Birth: "1960-11-30",
            Death: ""
        },
        Description: "A police officer is brought out of suspended animation in prison to pursue an old ultra-violent nemesis who is loose in a non-violent future society.",
        imageURL: "https://m.media-amazon.com/images/M/MV5BMDBmNDhjOTYtZWVlMC00YzUwLWIyZjEtYzFjMWM5OTdiZDJkXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_UX182_CR0,0,182,268_AL_.jpg"
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

//Get all users

app.get('/users', (req, res) => {
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

app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//POST requests

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username})
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//Add a movie to a user's favorite movies

app.post('/users/:Username/Movies/:MovieID', (req,res) => {
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

app.put('/users/:Username', (req, res) => {
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

app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username})
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + 'was not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Remove a movie from a user's favorite movies list

app.post('/users/:Username/Movies/:MovieID', (req,res) => {
    Users.findOneAndUpdate({ Username: req.params.Username}, {
      $pull: { FavoriteMovies: req.params.MovieID }
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

//Middleware

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

// Users document for MongoDB

var users = ([
{
    Username: "JeepGuy",
    Password: "JeepJL",
    Email: "bigtiresmatter@noemail.com",
    Birthdate: "1984-07-26"
},

{   
    Username: "rebelwithacause",
    Password: "Qwerty",
    Email: "noemailforu@noemail.com",
    Birthdate: "1983-03-03"
},
{
    Username: "iamchonky",
    Password: "Cookies!",
    Email: "chunkymonkey@noemail.com",
    Birthdate: "1985-05-08"
},
{    
    Username: "petey",
    Password: "falcoon",
    Email: "lordfalco@noemail.com",
    Birthdate: "1993-12-13"
},
{
    Username: "devastation",
    Password: "dtothaj",
    Email: "co5280@noemail.com",
    Birthdate: "2003-06-18"
},
])

//add favorite movie to users

db.users.update(
    { Username: "JeepGuy" },
    { $push: { FavoriteMovies: ObjectId("60aea0209da56eb7f8cf3a3c") } }
  )

db.users.update(
    { Username: "rebelwithacause" },
    { $push: { FavoriteMovies: ObjectId("60aea0209da56eb7f8cf3a3d") } }
  )

db.users.update(
    { Username: "iamchonky" },
    { $push: { FavoriteMovies: ObjectId("60aea0209da56eb7f8cf3a41") } }
  )

db.users.update(
    { Username: "petey" },
    { $push: { FavoriteMovies: ObjectId("60aea0209da56eb7f8cf3a3e") } }
  )

db.users.update(
    { Username: "devastation" },
    { $push: { FavoriteMovies: ObjectId("60aea0209da56eb7f8cf3a40") } }
  )

  db.users.update({}, {$set : {"FavoriteMovies":[]}}, {upsert:false, multi:true})
  db.movies.update({}, {$set : {"DirectorBio": []}}, {upsert:false, multi:true})
