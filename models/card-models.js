var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('card',new Schema({
  image: String,
  title: String,
  desc: String,
  stocked: String,
  type: String,
  paymentLink: String,
  mostPopular: {type: 'boolean', default: false}
  })
);
