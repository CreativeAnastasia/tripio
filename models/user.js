var mongoose = require('mongoose');
var Schema = mongoose.Schema;
Trip = require('./trip.js');
tripSchema = mongoose.model('Trip').schema;


var userSchema = new Schema({
  name: String,
  email: String,
  facebookId: String,
  trips: [tripSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
