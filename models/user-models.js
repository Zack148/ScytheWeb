var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const userSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail: String,
  name: String,
  twitterId: String,
  profilePicture: String
});

const User = mongoose.model('user', userSchema);
module.exports = User;
