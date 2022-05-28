const router = require('express').Router();
const gardenController = require('../controllers/garden-log');

// gets all plants' info at /seeds route
router.get('/', gardenController.getAllEntries);

// gets one plant's info at /seeds/id route
router.get('/:id', gardenController.getOneEntry);

// creates new plant's info at /seeds route
router.post('/', gardenController.createEntry);

// updates a plant's info at /seeds/id route
router.put('/:id', gardenController.updateEntry);

// deletes a plant's info at /seeds/id route
router.delete('/:id', gardenController.deleteEntry);

module.exports = router;