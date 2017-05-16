var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var stopSchema = new Schema ({
  stop: String,
  time: Number
});

var ratingSchema = new Schema ({
  userId: Number,
  rating: Number
})

var tripSchema = new Schema({
  name: {type: String, required: true},
  tagline: String,
  location: String,
  summary: String,
  stops: [stopSchema],
  tags: [{type: String}],
  ratings: [ratingSchema]
});

tripSchema.virtual('avgRating').get(function() {
  //use reduce on array
  //return this=current document this.Ratings
});

ratingSchema.set('toJSON', {
  virtuals: true
  });


module.exports = mongoose.model('Trip', tripSchema);
