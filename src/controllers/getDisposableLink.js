const getEventList = require('./getEventList')
const request = require("request")

function getDisposableLink(slug) {
    return new Promise(async (resolve, reject) => {
    // takes a particular slug, and returns a disposable link slug
    // then, get the event list
    let event_list = await getEventList();
    // go through the event list and assign the links
    for (let i = 0; i < event_list.length; i++) {
        // instituting a try catch block for if i ever change something in calendly that throws it off
        if (event_list[i]["slug"] == slug) {
            const options = {
                method: 'POST',
                url: 'https://api.calendly.com/scheduling_links',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + process.env.TOKEN
                },
                body: {
                    max_event_count: 1,
                    owner: event_list[i]["uri"],
                    owner_type: 'EventType'
                },
                json: true
            };
    
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                resolve(body["resource"]["booking_url"])
            });

        }
    }
    })
}

module.exports = getDisposableLink;