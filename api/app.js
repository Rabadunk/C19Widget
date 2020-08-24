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

function buildChart(){
 
    const chart = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" height="100" width="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />Sorry, your browser does not support inline SVG. </svg>'
   
    return chart
   
}

console.log(database.ref("Locations"));


var express = require('express');
var server = express();


module.exports = server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(buildChart());
});
