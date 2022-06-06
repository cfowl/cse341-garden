const ObjectId = require('mongodb').ObjectId;
const db = require('../models');
const Seed = db.seeds;

// gets all seeds' info
async function getAllSeeds(req, res) {
    Seed.find()
    .then(seeds => {
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
        if(!seed) res.status(404).json({ message: `Seed with that ID not found!` });
        else res.status(200).json(seed);
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
    // Save the seed we just created
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
    });
}

// updates one seed's info by ID
async function updateSeed(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid seed ID to update a seed\'s info.');
        return;
    }

    Seed.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then(seed => {
        if(!seed) res.status(404).json({ message: `Seed with that ID was not found and could not be updated!`});
        else res.status(204).json({ message: `The seed was updated successfully!`});
    })
    .catch(err => {
        res.status(500).json({
            message: 'Seed was not updated!',
            error: err
        });
    });
}

// deletes a seed's info by ID
async function deleteSeed(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid seed ID to delete a seed\'s info.');
        return;
    }

    Seed.findByIdAndRemove(req.params.id)
    .then(seed => {
        if(!seed) res.status(404).json({ message: `Seed with that ID was not found and coule not be deleted!`});
        else res.status(204).json({ message: `The seed was deleted successfully!`});
    })
    .catch(err => {
        res.status(500).json({
            message: 'Seed was not deleted!',
            error: err
        });
    });
}

module.exports = {
    getAllSeeds,
    getOneSeed,
    createSeed,
    updateSeed,
    deleteSeed,
};