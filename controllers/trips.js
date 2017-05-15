var Trip = require('./../models/trip')

var tripController = {

  // user: function(req, res, next) {
  //   res.render('user')
  // },

  index: function(req, res, next) {
    Trip.find({}, (err, trips) => {
      res.render('index', {trips: trips});
    })
  },

  new: function(req, res, next) {
    res.render('new', {trip: false});
  },

  create: function(req, res, next) {
    let trip = new Trip(req.body);

    trip.save((err) => {
      if (err) return res.render('/trips/new');
      res.redirect("/trips");
    })
  },

  edit: function(req, res, next) {
    Trip.findById(req.params.id, function(err, data) {
      if (err) res.redirect('/trips');
      res.render('edit');
    })
  },
//
  update: function(req, res, next) {
    Trip.findByIdAndUpdate(req.params.id, req.body, function(err, trip) {
      if (err) return res.render('/trips/' + req.params.id + '/edit');
      res.redirect('/trips');
    });
  },
//
  delete: function(req, res, next) {
    Trip.findByIdAndRemove(req.params.id, function(err) {
        if (err) return res.redirect('/');
        res.redirect('/trips');
      });
    },

    show: function(req, res, next) {
      Trip.find(req.params.id, (err, trips) => {
        res.render('/trips/:id', {trip: trip});
      })
    },

};

module.exports = tripController;
