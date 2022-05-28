const router = require('express').Router();
const seedsController = require('../controllers/seeds');

// gets all plants' info at /seeds route
router.get('/', seedsController.getAllSeeds);

// gets one plant's info at /seeds/id route
router.get('/:id', seedsController.getOneSeed);

// creates new plant's info at /seeds route
router.post('/', seedsController.createSeed);

// updates a plant's info at /seeds/id route
router.put('/:id', seedsController.updateSeed);

// deletes a plant's info at /seeds/id route
router.delete('/:id', seedsController.deleteSeed);

module.exports = router;