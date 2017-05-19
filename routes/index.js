var express = require('express');
var router = express.Router();
var tripController = require('../controllers/trips');
var passport = require('passport');


// The root route renders our only view
router.get('/', tripController.landing);
router.get('/landing', tripController.landing);


router.get('/auth/facebook',
    passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate(
    'facebook', {
        successRedirect: '/trips',
        failureRedirect: '/'
    }
));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/trips');
});

router.get('/mytrips', tripController.mytrips);
router.get('/trips', tripController.index);
router.get('/trips/new', tripController.new);
router.post('/trips', tripController.create);
router.get('/trips/:id', tripController.show);
router.get('/trips/:id/edit', tripController.edit);
router.put('/trips/:id', tripController.update);
router.delete('/trips/:id', tripController.delete);
router.get('/trips/:id/ratings', tripController.addrating);

module.exports = router;
