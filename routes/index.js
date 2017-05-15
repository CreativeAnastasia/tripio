var express = require('express');
var router = express.Router();
var tripController = require('../controllers/trips');

/* GET home page. */
router.get('/trips', tripController.index);
router.get('/trips/new', tripController.new);
router.post('/trips', tripController.create);
// router.get('/trips/:id', tripController.show);
router.get('/trips/:id/edit', tripController.edit);
router.put('/trips/:id', tripController.update);
router.delete('/trips:id', tripController.delete);

module.exports = router;
