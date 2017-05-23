const homeHandler = require('./home')
const filesHandler = require('./static-files')
const products = require('./product')

module.exports = [homeHandler, filesHandler, products]