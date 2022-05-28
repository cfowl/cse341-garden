const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// gets all seeds' info
async function getAllSeeds(req, res) {
    try {
        const seeds = await mongodb.getDb().db().collection('seeds').find();
        seeds.toArray().then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}
  
// gets one  seed's info by ID
async function getOneSeed(req, res) {
    try {
        const seedId = new ObjectId(req.params.id);
        const seedInfo = await mongodb.getDb().db().collection('seeds').find({_id: seedId});
        seedInfo.toArray().then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data[0]);
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

// creates a new  seed's info
async function createSeed(req, res) {
    try {
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
        console.log(seedInfo);
        const result = await mongodb.getDb().db().collection('seeds').insertOne(seedInfo);
        console.log(result);
        if(result.acknowledged) res.status(201).json(result);
        else res.status(500).json(result.error || `An error occurred while inserting the  seed's info`);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

// updates one  seed's info by ID
async function updateSeed(req, res) {
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
        console.log(seedInfo);
        const result = await mongodb.getDb().db().collection('seeds').replaceOne({_id: seedId}, seedInfo);
        console.log(result);
        if(result.modifiedCount > 0) res.status(204).send();
        else res.status(500).json(result.error || `An error occurred while updating the  seed's info`);
        
    } catch (err) {
        res.status(500).json({message: err.message});    
    }
}

// deletes a  seed's info by ID
async function deleteSeed(req, res) {
    try {
        const seedId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('seeds').deleteOne({_id: seedId});
        console.log(result);
        if(result.deletedCount > 0) res.status(204).send();
        else res.status(500).json(result.error || `An error occurred while deleting the  seed's info`);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    getAllSeeds,
    getOneSeed,
    createSeed,
    updateSeed,
    deleteSeed,
};