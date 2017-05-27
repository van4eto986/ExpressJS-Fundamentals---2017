const fs = require('fs');
const url = require('url');
const database = require('../config/database');
const path = require('path');
const qs = require('querystring');

module.exports = (req, res) => {

    req.pathname = req.pathname || url.parse(req.url).pathname;
    if (req.pathname === '/submit-image' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/submit-image.html'));
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('Page not found!');
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else if (req.pathname === '/submit-image' && req.method === 'POST') {
        let dataString = '';

        req.on('data', (data) => {
            dataString += data;
        });

        req.on('end', () => {
            let imageData = qs.parse(dataString);
            if (!imageData.name || !imageData.imageUrl) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write("There are empty fields!");
                res.end();
                return;
            }
            database.images.add(imageData);

            res.writeHead(302, {
                'Location': '/'
            });
            res.end();
        });
    } else {
        return true;
    }
}