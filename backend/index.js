const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');

const app = express();
const http = require('http').Server(app);

// Import routes
const statusRoutes = require("./routes/statusRoutes");
const userRoutes = require("./routes/userRoutes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(expressValidator());

const dbName = process.env.NODE_ENV === 'dev' ? 'database-test' : 'database';
// Connect to Mongoose and set connection variable
const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${dbName}:27017/?authMechanism=SCRAM-SHA-1&authSource=admin`;
mongoose.set('useCreateIndex', true);
mongoose.connect(url);

var db = mongoose.connection;
// Setup server port
var port = process.env.PORT || 8080;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,PATCH');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

count = 0;
app.use('*', (req, res, next) => {
    count++; 
    next(); 
});

// Send message for default URL
app.get('/', (req, res) => res.send('User-Register is Working!!'));

// Use Api routes in the App
app.use('/api/v1', statusRoutes);
app.use('/api/v1', userRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running User-Register on port " + port);
    app.emit('APP_STARTED');
});

module.exports = app