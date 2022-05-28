const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'));

// handle any uncaught errors
process.on('uncaughtException', (err, origin) => {
console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// connect to the server and start the app
mongodb.initDb(err => {
    if (err) console.error(err);
    else {
        app.listen(port);
        console.log(`Running on port ${port}`);
    }
});