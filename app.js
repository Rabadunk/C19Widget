let firebase = require('firebase');
let fs = require('fs');
let vega = require('vega')

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

var stackedBarChartSpec = require('./stacked-bar-chart.spec.json');

// create a new view instance for a given Vega JSON spec
var view = new vega
  .View(vega.parse(stackedBarChartSpec))
  .renderer('none')
  .initialize();

// generate static PNG file from chart
view
  .toCanvas()
  .then((canvas) => {
    // process node-canvas instance for example, generate a PNG stream to write var
    const out = fs.createWriteStream(__dirname + '/test.jpeg');
    const stream = canvas.createJPEGStream();
    stream.pipe(out);
  })
  .catch(function (err) {
    console.log("Error writing PNG to file:")
    console.error(err)
  });
// END vega-demo.js


