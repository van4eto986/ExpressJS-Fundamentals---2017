const http = require('http')
const port = 6012

const handlers = require('./handlers')

http.createServer((req, res) => {
  for( let handler of handlers){
    if(!handler(req, res)){
      break
    }
  }

}).listen(port)
console.log(`Server is listening on port ${port}`)
