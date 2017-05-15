var Trip = require('./../models/trip')

var tripController = {

  user: function(req, res, next) {
    res.render('user')
  },

  index: function(req, res, next) {
    Trip.find({}, (err, trip) => {
      res.render('index', {trip: trip});
    })
  },

  new: function(req, res, next) {
    res.render('new');
  },

  create: function(req, res, next) {
    let trip = new Trip(req.body);

    trip.save((err) => {
      if (err) return res.render('trips/new');
      res.redirect("/trips");
    })
  },

  edit: function(req, res, next) {
    Trip.findById(req.params.id, function(err, data) {
      if (err) res.redirect('/trips');
      res.render('edit');
    })
  },

  update: function(req, res, next) {
    Trip.findByIdAndUpdate(req.params.id, req.body, function(err, trip) {
      if (err) return res.render('trips/' + req.params.id + '/edit');
      res.redirect('/trips');
    });
  },

  destroy: function(req, res, next) {
    Trip.findByIdAndRemove(req.params.id, function(err) {
        if (err) return res.redirect('/');
        res.redirect('/trips');
      });
    },
};

module.exports = tripController;
