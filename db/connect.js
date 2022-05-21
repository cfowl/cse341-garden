const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let _database;

function initDb(callback) {

    if(_database) {
        console.log('Database is already initialized!');
        return callback(null, _database);
    }

    const client = new MongoClient(process.env.MONGO_URI);
    
    client.connect()
    .then(client => {
        _database = client;
        console.log('Connected to the database!');
        callback(null, _database);
    })
    .catch(error => {
        callback(error);
    });

}

function getDb() {
    if(!_database) throw Error('Database not initialized!');
    return _database;
}

module.exports = {
    initDb,
    getDb
};