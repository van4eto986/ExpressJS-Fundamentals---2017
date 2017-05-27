const fs = require('fs');
const url = require('url');
const path = require('path');
const database = require('../config/database');
let requestedImage;

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;
    if (req.pathname.startsWith('/images/details/') && req.method === 'GET') {
        let tokensPathName = req.pathname.split('/');
        let idRequestedImage = parseInt(tokensPathName[tokensPathName.length - 1]);
        let allImages = database.images.getAll();
        requestedImage = allImages.filter((img) => img.id === idRequestedImage);

        if (requestedImage.length > 0) {
            let image = requestedImage[0];
            let filePath = path.normalize(path.join(__dirname, '../views/image-details.html'));
            fs.readFile(filePath, (err, data) => {
               if (err) {
                   console.log(err);
                   res.writeHead(404, {
                       'Content-Type': 'text/plain'
                   });
                   res.write('404 not found!');
                   res.end();
                   return;
               }
               res.writeHead(200, {
                   'Content-Type': 'text/html'
               });
               let content = '';
               content += `<div class="image-card">
                        <img class="image-img" src="${image.imageUrl}">
                        <h2>${image.name}</h2>
                        </div>`;
               let html = data.toString().replace('{content}', content);
               res.write(html);
               res.end();

            })
        } else {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.write('404 not found!');
            res.end();
        }
    } else {
        return true;
    }
}