const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// gets all garden log entries
async function getAllEntries(req, res) {
    try {
        mongodb
          .getDb()
          .db()
          .collection('garden-log')
          .find()
          .toArray((err, data) => {
            if(err) res.status(400).json({message: err});
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
          });
    } catch (error) {
        res.status(500).json(error);
    }
}
  
// gets one garden log entry by ID
async function getOneEntry(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid garden log ID to get a garden log entry.');
        return;
    }

    try {
        const entryId = new ObjectId(req.params.id);
        mongodb
          .getDb()
          .db()
          .collection('garden-log')
          .find({_id: entryId})
          .toArray((err, data) => {
            if(err) res.status(400).json({message: err});
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data[0]);
          });
    } catch (error) {
        res.status(500).json(error);
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
        const result = await mongodb.getDb().db().collection('garden-log').insertOne(entry);
        console.log(result);
        if(result.acknowledged) res.status(201).json(result);
        else res.status(500).json(result.error || `An error occurred while inserting the garden log entry.`);
    } catch (error) {
        res.status(500).json(error);
    }
}

// updates one garden log entry by ID
async function updateEntry(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid garden log ID to update a garden log entry.');
        return;
    }
    
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
        const result = await mongodb.getDb().db().collection('garden-log').replaceOne({_id: entryId}, entry);
        console.log(result);
        if(result.modifiedCount > 0) res.status(204).send();
        else res.status(500).json(result.error || `An error occurred while updating the garden log entry.`);
    } catch (error) {
        res.status(500).json(error);
    }
}

// deletes a garden log entry by ID
async function deleteEntry(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid garden log ID to delete a garden log entry.');
        return;
    }
    
    try {
        const entryId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('garden-log').deleteOne({_id: entryId});
        console.log(result);
        if(result.deletedCount > 0) res.status(204).send();
        else res.status(500).json(result.error || `An error occurred while deleting the garden log entry.`);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getAllEntries,
    getOneEntry,
    createEntry,
    updateEntry,
    deleteEntry,
};