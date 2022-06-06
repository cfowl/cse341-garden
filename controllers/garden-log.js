const ObjectId = require('mongodb').ObjectId;
const db = require('../models');
const GardenLog = db.gardenLog;

// gets all garden log entries
async function getAllEntries(req, res) {
    GardenLog.find()
    .then(gLog => {
        res.status(200).json(gLog);
    })
    .catch(err => {
        res.status(500).json({message: err});
    });
}
  
// gets one garden log entry by ID
async function getOneEntry(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid seed ID to get a seed\'s info.');
        return;
    }

    GardenLog.findById(req.params.id)
    .then(gLog => {
        if(!gLog) res.status(404).json({ message: `Garden Log with that ID not found!` });
        else res.status(200).json(gLog);
    })
    .catch(err => {
        res.status(500).json({message: err});
    });
}

// creates a new garden log entry
async function createEntry(req, res) {
    const gLog = new GardenLog({
        year: req.body.year,
        seedName: req.body.seedName,
        seedType: req.body.seedType,
        variety: req.body.variety,
        plantedQty: req.body.plantedQty,
        plantedDate: req.body.plantedDate,
        harvestedQty: req.body.harvestedQty,
        harvestedDate: req.body.harvestedDate,
        notes: req.body.notes
    });
    // Save the Garden Log we just created
    gLog.save()
    .then(gLog => {
        res.status(201).json({
            message: 'Garden Log was added successfully!',
            gLog: gLog
        });
    })
    .catch(err => {
        res.status(500).json({
            message: 'Garden Log was not saved!',
            error: err
        });
    });
}

// updates one garden log entry by ID
async function updateEntry(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid seed ID to update a seed\'s info.');
        return;
    }

    GardenLog.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then(gLog => {
        if(!gLog) res.status(404).json({ message: `Garden Log with that ID was not found and could not be updated!`});
        else res.status(204).json({ message: `The Garden Log was updated successfully!`});
    })
    .catch(err => {
        res.status(500).json({
            message: 'Garden Log was not updated!',
            error: err
        });
    });
}

// deletes a garden log entry by ID
async function deleteEntry(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid seed ID to delete a seed\'s info.');
        return;
    }

    GardenLog.findByIdAndRemove(req.params.id)
    .then(gLog => {
        if(!gLog) res.status(404).json({ message: `Garden Log with that ID was not found and coule not be deleted!`});
        else res.status(204).json({ message: `The Garden Log was deleted successfully!`});
    })
    .catch(err => {
        res.status(500).json({
            message: 'Garden Log was not deleted!',
            error: err
        });
    });
}

module.exports = {
    getAllEntries,
    getOneEntry,
    createEntry,
    updateEntry,
    deleteEntry,
};