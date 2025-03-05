
const zlib = require('zlib');

module.exports.createGzipData = function createGzipData(object) {

    const jsonString = JSON.stringify(object);

    zlib.gzip(jsonString, (err, buffer) => {
        if (err) {
            console.error("Gzip failed:", err);
            throw 'Gzip failed: ' + err
        }
        // console.log("Gzip binary data:", buffer);
        return buffer
    });
}