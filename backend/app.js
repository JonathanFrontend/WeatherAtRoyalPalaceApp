const server = require('express')();
const fetch = require('node-fetch');
const port = 8080;

server.get('/api', (req, res) => {
    // /lon/16.57/lat/59.3281/
    const lon = parseFloat(req.query.lon) || 0;
    const lat = parseFloat(req.query.lat) || 0;
    fetch(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`)
    .then(r => r.text())
    .then(d => {
        console.log(lon, lat);
        
        res.status(200).json(JSON.parse(d));
    }).catch(err => {
        res.status(400).json(err);
    })
});

server.listen(port, function(err){
    if (err) {
        console.log('An error occured', err);
    } else {
        console.log('Server is listening on port: ', port);
    }
});