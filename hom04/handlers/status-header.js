const fs = require('fs');
const database = require('../config/database');

module.exports = (req, res) => {

    if (req.path.indexOf('/views/status') != -1 && req.method === 'GET') {
        req.headers['statusheader'] = 'Full';
    }
    let statusHeader = req.headers['statusheader'];

    if (statusHeader && statusHeader === 'Full') {
        fs.readFile('./views/status.html', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            let totalImages = database.images.getAll().length;
            data = data.toString().replace('{content}', `<h1>Total images = ${totalImages}</h1>`)

            res.writeHead(200, {
                'Content-Type': 'text/html'
            })

            res.write(data);
            res.end();
        })
    } else {
        return true;
    }
}