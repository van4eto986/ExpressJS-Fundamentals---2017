const Recipe = require('../models/Recipe')
module.exports = {
  index: (req, res) => {
    Recipe.find({})
    .populate('category') 
    .limit(4)
    .then(recipes => {
      res.render('home/home', {recipes: recipes})
    })
  },
  contactUs: (req, res) => {
    res.render('home/contact-us')
  }
}