const ObjectId = require('mongodb').ObjectId;
const db = require('../models');
const Seed = db.seeds;

// gets all seeds' info
async function getAllSeeds(req, res) {
    Seed.find()
    .then(seeds => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(seeds);
    })
    .catch(err => {
        res.status(500).json({message: err});
    });
}
  
// gets one seed's info by ID
async function getOneSeed(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid seed ID to get a seed\'s info.');
        return;
    }

    Seed.findById(req.params.id)
    .then(seed => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(seed);
    })
    .catch(err => {
        res.status(500).json({message: err});
    });
}

// creates a new seed's info
async function createSeed(req, res) {
    const seed = new Seed({
        name: req.body.name,
        type: req.body.type || 'n/a',
        seedsPerOunce: req.body.seedsPerOunce,
        seedsPer100Feet: req.body.seedsPer100Feet,
        sowingDepth: req.body.sowingDepth,
        daysToGermination: req.body.daysToGermination,
        rowSpacing: req.body.rowSpacing,
        plantSpacing: req.body.plantSpacing,
        daysToHarvest: req.body.daysToHarvest,
        plantingDate: req.body.plantingDate
    });

    seed.save()
    .then(seed => {
        res.status(201).json({
            message: 'Seed added successfully',
            seed: seed
        });
    })
    .catch(err => {
        res.status(500).json({
            message: 'Seed was not saved',
            error: err
        });
    })
}

// updates one seed's info by ID
async function updateSeed(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid seed ID to update a seed\'s info.');
        return;
    }
    
    try {
        const seedId = new ObjectId(req.params.id);
        const seedInfo = {
            name: req.body.name,
            type: req.body.type,
            seedsPerOunce: req.body.seedsPerOunce,
            seedsPer100Feet: req.body.seedsPer100Feet,
            sowingDepth: req.body.sowingDepth,
            daysToGermination: req.body.daysToGermination,
            rowSpacing: req.body.rowSpacing,
            plantSpacing: req.body.plantSpacing,
            daysToHarvest: req.body.daysToHarvest,
            plantingDate: req.body.plantingDate
        };
        const result = await mongodb.getDb().db().collection('seeds').replaceOne({_id: seedId}, seedInfo);
        console.log(result);
        if(result.modifiedCount > 0) res.status(204).send();
        else res.status(500).json(result.error || `An error occurred while updating the seed's info`);
    } catch (error) {
        res.status(500).json(error);
    }
}

// deletes a seed's info by ID
async function deleteSeed(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid seed ID to delete a seed\'s info.');
        return;
    }
    
    try {
        const seedId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('seeds').deleteOne({_id: seedId});
        console.log(result);
        if(result.deletedCount > 0) res.status(204).send();
        else res.status(500).json(result.error || `An error occurred while deleting the  seed's info`);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getAllSeeds,
    getOneSeed,
    createSeed,
    updateSeed,
    deleteSeed,
};