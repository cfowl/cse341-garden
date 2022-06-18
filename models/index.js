const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Load config vars
dotenv.config({ path: './config/config.env'});

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_URI;
db.seeds = require('./Seed.js')(mongoose);
db.gardenLog = require('./Garden-Log2.js')(mongoose);
db.users = require('./User.js');

module.exports = db;
