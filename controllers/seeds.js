const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// gets all seeds' info
async function getAllSeeds(req, res) {
    mongodb
      .getDb()
      .db()
      .collection('seeds')
      .find()
      .toArray((err, data) => {
        if(err) res.status(400).json({message: err});
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
      });
}
  
// gets one seed's info by ID
async function getOneSeed(req, res) {
    if (!ObjectId.isValid(req.params.id)) res.status(400).json('Must use a valid seed ID to find a seed\'s info.');

    const seedId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('seeds')
      .find({_id: seedId})
      .toArray((err, data) => {
        if(err) res.status(400).json({message: err});
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data[0]);
      });
}

// creates a new seed's info
async function createSeed(req, res) {
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
    const result = await mongodb.getDb().db().collection('seeds').insertOne(seedInfo);
    console.log(result);
    if(result.acknowledged) res.status(201).json(result);
    else res.status(500).json(result.error || `An error occurred while inserting the seed's info`);
}

// updates one seed's info by ID
async function updateSeed(req, res) {
    if (!ObjectId.isValid(req.params.id)) res.status(400).json('Must use a valid seed ID to update a seed\'s info.');
    
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
}

// deletes a seed's info by ID
async function deleteSeed(req, res) {
    if (!ObjectId.isValid(req.params.id)) res.status(400).json('Must use a valid seed ID to delete a seed\'s info.');
    
    const seedId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('seeds').deleteOne({_id: seedId});
    console.log(result);
    if(result.deletedCount > 0) res.status(204).send();
    else res.status(500).json(result.error || `An error occurred while deleting the  seed's info`);
}

module.exports = {
    getAllSeeds,
    getOneSeed,
    createSeed,
    updateSeed,
    deleteSeed,
};