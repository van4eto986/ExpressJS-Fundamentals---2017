const fs = require('fs')
const dataFile = 'storage.dat'
let data = {}

let validateKey = (key) =>{
  if (typeof key !=='string'){
    throw new Error('Key must be a string')    
  }
}
let validateExists = (key) => {  
  if (!data.hasOwnProperty){
        throw new Error('Key could not be found')
    }
}

let put = (key, value) => {
  validateKey(key)
  if (typeof key !=='string'){
    throw new Error('Key must be a string')    
  }

  if(data.hasOwnProperty(key)){
    throw new Error('Key already exists')
  }
  data[key] = value
}


let get = (key) => {
    validateKey(key)
    validateExists(key)
    return data[key]
}

let undate = (key, value) => {
    validateKey(key)
    validateExists(key)
    data[key] = value
}

let deleteItem = (key) => {
    validateKey(key)
    validateExists(key)
    delete data[key]
}

let clear = () => {
    data={}
}

let save = () => {
    return new Promise((resolve, reject) => {
        let dataAsString = JSON.stringify(data)
        fs.writeFile(dataFile, dataAsString, (err) => {
            if(err){
                reject(err)
                return
            }
            resolve()
        })
    })
}

let load = () => {

    return new Promise((resolve, reject) =>{
        fs.readFile(dataFile, 'utf8', (err, dataJson) =>{
            if(err){
              reject(err)
              return
            }
            data=JSON.parse(dataJson)
            resolve()
        })
    })
}

module.exports = {
  put: put,
  get: get,
  undate: undate,
  delete: deleteItem,
  clear: clear,
  save: save,
  load: load
}
