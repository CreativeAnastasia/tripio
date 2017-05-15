var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.once('open', function () {
  console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
});

module.exports = mongoose;
