const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// gets all garden log entries
async function getAllEntries(req, res) {
    try {
        const entries = await mongodb.getDb().db().collection('garden-log').find();
        entries.toArray().then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}
  
// gets one garden log entry by ID
async function getOneEntry(req, res) {
    try {
        const entryId = new ObjectId(req.params.id);
        const entry = await mongodb.getDb().db().collection('garden-log').find({_id: entryId});
        entry.toArray().then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data[0]);
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

// creates a new garden log entry
async function createEntry(req, res) {
    try {
        const entry = {
            year: req.body.year,
            seedName: req.body.seedName,
            seedType: req.body.seedType,
            variety: req.body.variety,
            plantedQty: req.body.plantedQty,
            plantedDate: req.body.plantedDate,
            harvestedQty: req.body.harvestedQty,
            harvestedDate: req.body.harvestedDate,
            notes: req.body.notes
        };
        console.log(entry);
        const result = await mongodb.getDb().db().collection('garden-log').insertOne(seedInfo);
        console.log(result);
        if(result.acknowledged) res.status(201).json(result);
        else res.status(500).json(result.error || `An error occurred while inserting the garden log entry.`);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

// updates one garden log entry by ID
async function updateEntry(req, res) {
    try {
        const entryId = new ObjectId(req.params.id);
        const entry = {
            year: req.body.year,
            seedName: req.body.seedName,
            seedType: req.body.seedType,
            variety: req.body.variety,
            plantedQty: req.body.plantedQty,
            plantedDate: req.body.plantedDate,
            harvestedQty: req.body.harvestedQty,
            harvestedDate: req.body.harvestedDate,
            notes: req.body.notes
        };
        console.log(entry);
        const result = await mongodb.getDb().db().collection('garden-log').replaceOne({_id: entryId}, entry);
        console.log(result);
        if(result.modifiedCount > 0) res.status(204).send();
        else res.status(500).json(result.error || `An error occurred while updating the garden log entry.`);
        
    } catch (err) {
        res.status(500).json({message: err.message});    
    }
}

// deletes a garden log entry by ID
async function deleteEntry(req, res) {
    try {
        const entryId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('garden-log').deleteOne({_id: entryId});
        console.log(result);
        if(result.deletedCount > 0) res.status(204).send();
        else res.status(500).json(result.error || `An error occurred while deleting the garden log entry.`);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    getAllEntries,
    getOneEntry,
    createEntry,
    updateEntry,
    deleteEntry,
};