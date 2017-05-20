const storage = require('./storage')

storage.put('first', 'some value')
storage.put('second', true)
storage.put('third', 1)

let someValue = storage.get('first')
console.log(someValue)

storage.undate('first','another value')
let anotherValue = storage.get('first')
console.log(anotherValue)

storage.delete('first')

storage.clear()

storage.put('second', true)
storage.put('third', 1)

storage
    .save()
    .then(() => {
    storage.clear()

    storage
    .load()
    .then(() => {
        let afterLoadValue = storage.get('second')
        console.log(afterLoadValue)
    })
})