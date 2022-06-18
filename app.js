const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Load config vars
dotenv.config({ path: './config/config.env'});

// Passport config
require('./config/passport')(passport);

// Connect the database
connectDB();

// Create the app
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

// Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }
}));

// Passport middleware
app
  .use(passport.initialize())
  .use(passport.session());

// Routes
app.use('/', require('./routes'));

// Handle any uncaught errors
process.on('uncaughtException', (err, origin) => {
console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

const PORT = process.env.PORT || 3000;

// Connect to the server and start the app
app.listen(
  PORT,
  console.log(`Server running on port ${process.env.PORT}`)
);