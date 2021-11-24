function parseJSON(string) {
    let obj = JSON.parse(string);
    obj = obj["collection"];
    let arr = new Array();
    for (let i = 0; i < obj.length; i++) {
        arr.push(
                {
                    "url": obj[i]["uri"],
                    "duration": obj[i]["duration"],
                    "slug": obj[i]["slug"]
                }
            )
    }
    return arr;
}

module.exports = parseJSON;