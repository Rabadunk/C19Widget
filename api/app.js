const D3Node = require('d3-node');
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

async function buildChart() {
    let database = firebase.database(app).ref("Locations");
    let x = 10;
    let minY = 30;
    let maxHeight = 120;
    const d3n = new D3Node({styles:'.blah{fill:#fddb53;}.bar:hover{fill:#a9a9a9;opacity: 0.6;cursor:pointer;}.bar {fill:#fddb53;animation: load 3s;}.title{font-family:helvetica;font-size:13px;}.label{font-family:helvetica;font-size:8px;}@keyframes load { from{y: 120px; fill:teal;}}'});
    let svgChart = d3n.createSVG(460, 170);
    svgChart.append('text').text('Cases by DHB').attr('class', 'title').attr('x', 176).attr('y', 20);
    await database.once('value').then(async (value) => {
        data = value.val();
        let count = 0;
        while(count < 5) {
            placeInfo = data[count];
            dhb = placeInfo["DHB"];
            total = placeInfo["Total"];
            let y = minY + (maxHeight - total/2);
            let height = total/2;
            svgChart.append('text').attr('x', x).attr('y',y-5).text(`${total} cases`).attr('class', 'label blah');
            svgChart.append('g').append('rect').attr('class', 'bar').attr('x', x).attr('y', y).attr('width', '80').attr('height', height);
            svgChart.append('text').attr('x', x).attr('y',maxHeight+45).text(dhb).attr('class', 'label');
            x += 90;
            console.log(500 - total);
            count++;
        }
    });



    return d3n.svgString();

   
}

module.exports = async (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');

    let jazz = await buildChart();
    res.status(200).send(jazz);
};
