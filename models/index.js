const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Load config vars
dotenv.config({ path: './config/config.env'});

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_URI;
db.seeds = require('./Seed')(mongoose);
db.gardenLog = require('./Garden-Log')(mongoose);
db.users = require('./User');

module.exports = db;
