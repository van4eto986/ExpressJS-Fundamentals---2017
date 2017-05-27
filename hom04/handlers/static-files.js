const fs = require('fs');
const path = require('path');

let getContentType = (url) => {
    let contentType = 'text/plain';
    if (url.endsWith('.html')) {
        contentType = 'text/html'
    } else if (url.endsWith('.css')) {
        contentType = 'text/css';
    } else if (url.endsWith('.js')) {
        contentType = 'application.javascript';
    }
    return contentType;
};

let isFileExtensionAllowed = (req) => {
    let isFileExtensionAllowed = false;
    let allowedFileExtension = [
        '.css',
        '.js',
        '.html',
        '.jpg'
    ];

    allowedFileExtension.forEach(e => req.path.endsWith(e) ? isFileExtensionAllowed = true : '');
    return allowedFileExtension;
};

module.exports = (req, res) => {
        if (req.path.startsWith('/content/') || req.path.startsWith('/images/content/') && req.method === 'GET') {
            let filePath = '.' + req.path;
            let isFileAllowed = isFileExtensionAllowed(req);

            fs.readFile(filePath, (err, data) => {
                if (err || !isFileAllowed) {
                    res.writeHead(404);
                    res.write('404 Not Found - Check your URL!', {
                        'Content-Type': 'text/plain'
                    });
                    res.end();
                    return;
                }
                res.writeHead(200, {
                    'Content-Type': getContentType(req.path)
                });
                res.write(data);
                res.end();
            })
        } else {
            return true;
        }
};