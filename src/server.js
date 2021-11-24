const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream'); // version 2.x
const request = require('request');

const getEventList = require('./controllers/getEventList');
const getDisposableLink = require('./controllers/getDisposableLink');
require('dotenv').config()

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))


app.get('/v1/test', (req, res) => {
    // to test if the endpoint is up and works as expected.
    res.send("UP");
});

app.get('/v1/event_types', async (req, res) => {
    // await the event list from the eventlist controller.
    let event_list = await getEventList();
    // send the event list to the client.
    res.send(event_list);
})

app.get('/v1/disposable/:event', async (req, res) => {
    // get the event slug that we want
    let event = req.params.event;
    let event_link = await getDisposableLink(event);
    res.send(event_link);

})

// starting the server
app.listen(process.env.PORT, () => {
    console.log('listening on port' + process.env.PORT);
});