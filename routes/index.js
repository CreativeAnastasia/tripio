var express = require('express');
var router = express.Router();
var tripController = require('../controllers/trips');
var passport = require('passport');

// The root route renders our only view
router.get('/', tripController.index);


router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' }
));

router.get('/auth/facebook/callback', passport.authenticate(
  'facebook',
  {
     successRedirect : '/trips',
     failureRedirect : '/'
   }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* GET home page. */
router.get('/mytrips', tripController.mytrips);
router.get('/trips', tripController.index);
router.get('/trips/new', tripController.new);
router.post('/trips', tripController.create);
router.get('/trips/:id', tripController.show);
router.get('/trips/:id/edit', tripController.edit);
router.put('/trips/:id', tripController.update);
router.delete('/trips/:id', tripController.delete);

module.exports = router;
