const fs = require('fs')
const url = require('url')
const path = require('path')

let getContentType = (url) =>{
    let contentType = 'text/plain'
            if(url.endsWith('.css')){
                contentType = 'text/css'
            }else if(url.endsWith('.js')){
                contentType = 'application/javascript'
            }

    return contentType 
}

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname
  if (req.pathname.startsWith('/content/') && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, `..${req.pathname}`))
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {
        'Content-Type': 'text/plain'
        })
        res.write('Resource not found!')
        res.end()
        return
      }
      res.writeHead(200, {
      'Content-Type' : getContentType(req.pathname)
      
    })
    res.write(data)
    res.end()
  })

  }else{
      return true
  }
}