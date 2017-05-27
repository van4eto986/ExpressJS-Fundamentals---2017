const fs = require('fs');

const pathFavicon = '/favicon.ico';

module.exports = (req, res) => {
    if (req.path === pathFavicon) {
        fs.readFile('.' + pathFavicon, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'image/x-icon'
            });
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};