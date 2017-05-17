var Trip = require('./../models/trip')

var tripController = {

  mytrips: function(req, res, next) {
    res.render('mytrips', {user: req.user});
  },

  index: function(req, res, next) {
    Trip.find({}, (err, trips) => {
      res.render('index', {trips: trips, user: req.user});
    });
  },

  new: function(req, res, next) {
    res.render('new', {trip: false, user: req.user});
    console.log("user in new    ", user);
  },

  create: function(req, res, next) {
    var trip = new Trip({
      name: req.body.name,
      tagline: req.body.tagline,
      location: req.body.location,
      summary: req.body.summary,
      tags: req.body.tags
    });
    if (typeof req.body.stop === "object"){
      req.body.stop.forEach(function(stop, i){
        console.log('i is ', i)
        trip.stops.push({
          time: req.body.time[i],
          stop: req.body.stop[i]
        });
      })
    } else {
      trip.stops.push({
        time: req.body.time,
        stop: req.body.stop
      });
    }
    trip.save((err) => {
      req.user.trips.push(trip._id);
      req.user.save(function(err) {
        if (err) return res.redirect('/trips/new');
        res.redirect('/mytrips');
      });
    });
  },

  show: function(req, res, next) {
    Trip.findById(req.params.id, (err, trip) => {
      var tripjson = trip.toObject();
      tripjson = JSON.stringify(tripjson)
      console.log(tripjson)
      console.log('typeof', typeof tripjson)
      res.render('show', {trip: trip, user: req.user, tripJSON: tripjson});
    })
  },

  edit: function(req, res, next) {
    Trip.findById(req.params.id, function(err, data) {
      if (err) res.redirect('/trips');
      res.render('edit', {trip: trip, user: req.user});
    });
  },

  update: function(req, res, next) {
    Trip.findById(req.params.id, function (err, trip) {
      console.log('req.body is ', JSON.stringify(req.body))
      trip.stops.push({
        time: req.body.time,
        stop: req.body.stop
      });
      console.log('new stops', trip.stops)
      trip.save().then(function(err, savedTrip) {
        if (err) return res.redirect('/trips');
          res.redirect('/mytrips');
      });
    })
  },

  show: function(req, res, next) {
    Trip.findById(req.params.id, (err, trip) => {
      var tripjson = trip.toObject();
      tripjson = JSON.stringify(tripjson)
      console.log(tripjson)
      console.log('typeof', typeof tripjson)
      res.render('show', {trip: trip, user: req.user, tripJSON: tripjson});
    })
  },

  update: function(req, res, next) {
    Trip.findByIdAndUpdate(req.params.id, req.body, function(err, trip) {
      if (err) return res.render('/trips/' + req.params.id + '/edit');
      res.redirect('/trips');
    });
  },

  delete: function(req, res, next) {
    Trip.findByIdAndRemove(req.params.id, function(err) {
        if (err) return res.redirect('/');
        res.redirect('/mytrips');
      });
  },

  addrating: function(req, res, next) {
    Trip.findById(req.params.id, function(err, trip) {
      trip.rate(req.query.rating, req.user.id, function(ratedTrip) {
        res.redirect(`/trips/${req.params.id}`);
      });
      if (err) return res.redirect('/');
        res.redirect('/trips');
    });
  }

};

module.exports = tripController;
