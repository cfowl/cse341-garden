const router = require('express').Router();
const plantsInfoController = require('../controllers/plantsInfo');

// gets all plants' info at /plantsInfo route
router.get('/', plantsInfoController.getAllPlantsInfo);

// gets one plant's info at /plantsInfo/id route
router.get('/:id', plantsInfoController.getOnePlantInfo);

// creates new plant's info at /plantsInfo route
router.post('/', plantsInfoController.createPlantInfo);

// updates a plant's info at /plantsInfo/id route
router.put('/:id', plantsInfoController.updatePlantInfo);

// deletes a plant's info at /plantsInfo/id route
router.delete('/:id', plantsInfoController.deletePlantInfo);

module.exports = router;