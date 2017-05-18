var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  name: String,
  email: String,
  photo: String,
  facebookId: String,
  trips: [{type: Schema.Types.ObjectId, ref: 'Trip'}]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
