const router = require('express').Router();
const seedsController = require('../controllers/seeds');
const validation = require('../middleware/seedValidator');

// gets all plants' info at /seeds route
router.get('/', seedsController.getAllSeeds);

// gets one plant's info at /seeds/id route
router.get('/:id', seedsController.getOneSeed);

// creates new plant's info at /seeds route
router.post('/', validation.saveSeed, seedsController.createSeed);

// updates a plant's info at /seeds/id route
router.put('/:id', validation.saveSeed, seedsController.updateSeed);

// deletes a plant's info at /seeds/id route
router.delete('/:id', seedsController.deleteSeed);

module.exports = router;