var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var stopSchema = new Schema ({
  stop: {type: String, required: true, minlength: 1},
  time: {type: String, required: true, minlength: 1}
});

var ratingSchema = new Schema ({
  userId: Schema.Types.ObjectId,
  rating: Number
})

var tripSchema = new Schema({
  name: {type: String, required: true},
  tagline: String,
  location: String,
  summary: String,
  stops: [stopSchema],
  tags: [{type: String}],
  pictureUrl: { type:String, default: "https://s3.amazonaws.com/imgserv.ownlocal.com/travel/travel-agency/travel-agency08-640x480%3E.jpg"},
  ratings: [ratingSchema]
});

tripSchema.methods.rate = function(rating, userId, cb){
  var trip = this;
  if ( this.ratings.some(rating => rating.userId.equals(userId)) ) {
    cb(trip);
  } else {
    this.ratings.push({userId: userId, rating: rating});
    this.save(function(err){
      cb(trip);
    });
  }
}

tripSchema.virtual('avgRating').get(function() {
  return this.ratings.reduce((acc, rating, idx) => {
    acc += rating.rating;
    if (idx === this.ratings.length - 1) return (acc / this.ratings.length).toFixed(2);
    return acc;
  }, 0);
});

ratingSchema.set('toJSON', {
  virtuals: true
  });


module.exports = mongoose.model('Trip', tripSchema);
