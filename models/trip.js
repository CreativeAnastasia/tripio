var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({
  name: {type: String, required: true},
  tagline: String,
  location: String,
  summary: String,
  stops: [{location: String, time: Number}],
  tags: [{
    type: String
}],
});


module.exports = mongoose.model('Trip', tripSchema);
