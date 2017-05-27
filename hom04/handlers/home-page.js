const fs = require('fs');
const database = require('../config/database');

module.exports = (req, res) => {
    if (req.path === '/') {
        fs.readFile('./views/index.html', (err, data) => {
            if (err) {
                console.log(err);
                res.write(404, {
                    'Content-Type': 'text/plain'
                });
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }


};