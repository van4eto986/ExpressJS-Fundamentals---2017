const fs = require('fs');
const url = require('url');
const database = require('../config/database');
const path = require('path');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/all-images' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/all-images.html'));
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('404 not found!')
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            let images = database.images.getAll();
            let content = '';

            for (let image of images) {
                content +=
                    `<div class="image-card">
                        <img class="image-img" src="${image.imageUrl}">
                            <a href="/images/details/${image.id}"><h2>${image.name}</h2></a>
                        </div>`
            }
            let html = data.toString().replace('{content}', content);
            res.write(html);
            res.end();
        });
    } else {
        return true;
    }
}