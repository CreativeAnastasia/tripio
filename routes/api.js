var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/api/api');


router.get('/api/all', apiCtrl.getAllTrips);
router.get('/api/:id', apiCtrl.getOneTrip);

module.exports = router;
