let products = []
let count = 1

module.exports.products = {}

module.exports.products.getAll = () => {
    return products
}

module.exports.products.add = (products) => {
    product.id = count++
    products.push(product)
}

module.exports.products.findByName = (name) => {
    return getProducts().filter(p => p.name.toLowerCase().includes(name))
}
