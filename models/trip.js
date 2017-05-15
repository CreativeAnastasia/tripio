var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var stopSchema = new Schema ({
  stop: String,
  time: Number
});

var tripSchema = new Schema({
  name: {type: String, required: true},
  tagline: String,
  location: String,
  summary: String,
  stops: [stopSchema],
  tags: [{type: String}]
});


module.exports = mongoose.model('Trip', tripSchema);
