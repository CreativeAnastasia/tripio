var Trip = require('./../models/trip')

var tripController = {

  mytrips: function(req, res, next) {
    res.render('mytrips', {user: req.user});
  },

  index: function(req, res, next) {
    Trip.find({}, (err, trips) => {
      res.render('index', {trips: trips, user: req.user});
    })
  },

  new: function(req, res, next) {
    res.render('new', {trip: false, user: req.user});
    console.log("user in new    ", user);
  },

  create: function(req, res, next) {

    console.log("req.body", JSON.stringify(req.body));
    var trip = new Trip({
      name: req.body.name,
      tagline: req.body.tagline,
      location: req.body.location,
      summary: req.body.summary,
      tags: req.body.tags
    });
    trip.stops.push({
      time: req.body.time,
      stop: req.body.stop
    });
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
      console.log(trip);
      res.render('show', {trip: trip, user: req.user});
    })
  },

  edit: function(req, res, next) {
    Trip.findById(req.params.id, function(err, trip) {
      if (err) res.redirect('/trips');
      res.render('edit', {trip: trip, user: req.user});
    })
  },

  update: function(req, res, next) {
    // grab trip from database
    // update values in trip
    // save trip's new values
    console.log(req.body);
    Trip.findById(req.params.id, function (err, trip) {
      //trip.save
    })

    Trip.findByIdAndUpdate(req.params.id, trip, function(err, trip) {
      if (err) return res.redirect('/trips');
      res.redirect('/mytrips');
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
      trip.rate(req.query.rating, req.user.id, function(updatedTrip) {
        console.log('updatedTrip', updatedTrip);
        res.redirect(`/trips/${req.params.id}`);
      });
    });
  }

};

module.exports = tripController;
