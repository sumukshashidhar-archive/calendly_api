const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream'); // version 2.x
const request = require('request');

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


app.get('/test', (req, res) => {
    res.send("UP");
});

lookup_table = JSON.parse(Buffer.from(process.env.LOOKUP, 'base64').toString('utf-8'));

app.get('/v1/disposable/:event', (req, res) => {
    let event = req.params.event;
    if (lookup_table.hasOwnProperty(event)) {
        const options = {
            method: 'POST',
            url: 'https://api.calendly.com/scheduling_links',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + process.env.TOKEN
            },
            body: {
                max_event_count: 1,
                owner: 'https://api.calendly.com/event_types/' + lookup_table[event],
                owner_type: 'EventType'
            },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            res.send(body["resource"]["booking_url"])
        });
    } else {
        res.send("INVALID");
    }

})

// starting the server
app.listen(process.env.PORT, () => {
    console.log('listening on port' + process.env.PORT);
});