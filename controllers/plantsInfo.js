const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// gets all plants' info
async function getAllPlantsInfo(req, res) {
    try {
        const plantsInfo = await mongodb.getDb().db().collection('plants-info').find();
        plantsInfo.toArray().then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}
  
// gets one plant's info by ID
async function getOnePlantInfo(req, res) {
    try {
        const plantId = new ObjectId(req.params.id);
        const plantInfo = await mongodb.getDb().db().collection('plants-info').find({_id: plantId});
        plantInfo.toArray().then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data[0]);
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

// creates a new plant's info
async function createPlantInfo(req, res) {
    try {
        const plantInfo = {
            plant: req.body.plant,
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
        console.log(plantInfo);
        const result = await mongodb.getDb().db().collection('plants-info').insertOne(plantInfo);
        console.log(result);
        if(result.acknowledged) res.status(201).json(result);
        else res.status(500).json(result.error || `An error occurred while inserting the plant's info`);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

// updates one plant's info by ID
async function updatePlantInfo(req, res) {
    try {
        const plantId = new ObjectId(req.params.id);
        const plantInfo = {
            plant: req.body.plant,
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
        console.log(plantInfo);
        const result = await mongodb.getDb().db().collection('plants-info').replaceOne({_id: plantId}, plantInfo);
        console.log(result);
        if(result.modifiedCount > 0) res.status(204).send();
        else res.status(500).json(result.error || `An error occurred while updating the plant's info`);
        
    } catch (err) {
        res.status(500).json({message: err.message});    
    }
}

// deletes a plant's info by ID
async function deletePlantInfo(req, res) {
    try {
        const plantId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('plants-info').deleteOne({_id: plantId});
        console.log(result);
        if(result.deletedCount > 0) res.status(204).send();
        else res.status(500).json(result.error || `An error occurred while deleting the plant's info`);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    getAllPlantsInfo,
    getOnePlantInfo,
    createPlantInfo,
    updatePlantInfo,
    deletePlantInfo
};