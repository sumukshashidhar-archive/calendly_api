const request = require('request');
const parseJSON = require('./parseJson');
function getEventList() {
    return new Promise((resolve, reject) => {
    // send a request 
    const options = {
        method: 'GET',
        url: 'https://api.calendly.com/event_types',
        qs: {user: process.env.USERURI},
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.TOKEN
        }
        };
        
        request(options, function (error, response, body) {
        if (error) throw new Error(error);
        
        let event_list = parseJSON(body)
        resolve(event_list);
        });
    })
}

module.exports = getEventList;