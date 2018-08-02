var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('user',new Schema({
  username: String,
  googleId: String,
  thumbnail: String,
  name: String,
  twitterId: String,
  profilePicture: String,
  canEdit: {type: 'boolean', default: false },
  })
);
