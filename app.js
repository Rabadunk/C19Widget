let firebase = require('firebase');

require('firebase/database');
require('dotenv').config();

let app = firebase.initializeApp({
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_ID,
    measurementId: process.env.MEASUREMENT_ID
});

let database = firebase.database(app);


console.log(database.ref("Locations"));


var express = require('express');
var server = express();
var path = require('path');

server.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

server.listen(8080);