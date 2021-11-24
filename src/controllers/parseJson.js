function parseJSON(string) {
    let obj = JSON.parse(string);
    obj = obj["collection"];
    let arr = new Array();
    for (let i = 0; i < obj.length; i++) {
        arr.push(
                obj[i]
            )
    }
    return arr;
}

module.exports = parseJSON;