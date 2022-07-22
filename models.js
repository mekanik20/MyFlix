const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//movie collection schema
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

//user collection schema
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

//password hashing via bcrypt
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

//validation of passwords
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

//create models for schemas
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

//export models
module.exports.Movie = Movie;
module.exports.User = User; 