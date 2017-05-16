var Trip = require('./../models/trip')

var tripController = {

  mytrips: function(req, res, next) {
    res.render('mytrips')
  },

  index: function(req, res, next) {
    Trip.find({}, (err, trips) => {
      res.render('index', {trips: trips, user: req.user});
    })
  },

  new: function(req, res, next) {
    res.render('new', {trip: false, user: req.user});
  },

  create: function(req, res, next) {

      console.log("user    ", user);

    console.log("rew.body", JSON.stringify(req.body));
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
      user.save(function(err) {
        res,json(user);
      });
      if (err) return res.redirect('/trips/new');
      res.redirect('/trips');
    });

  },

  edit: function(req, res, next) {
    Trip.findById(req.params.id, function(err, data) {
      if (err) res.redirect('/trips');
      res.render('edit');
    })
  },

  show: function(req, res, next) {
    Trip.find(req.params.id, (err, trip) => {
      res.render('show', {trips: trip});
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
        res.redirect('/trips');
      });
    }

};

module.exports = tripController;
