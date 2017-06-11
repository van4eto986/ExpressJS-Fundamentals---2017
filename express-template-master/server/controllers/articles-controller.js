const mongoose = require('mongoose')
const Article = mongoose.model('Article')
const errorHandler = require('../utilities/error-handler')

module.exports = {
  addGet: (req, res) => {
    res.render('articles/add')
  },
  addPost: (req, res) => {
    let articleReq = req.body
    let userId = req.user._id
    Article
      .create({
        title: articleReq.title,
        description: articleReq.description,
        user: userId
      })
      .then(article => {
        res.redirect('/article/list')
      })
      .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        res.render('articles/add', articleReq)
      })
  },
  all: (req, res) => {
    let pageSize = 2
    let page = parseInt(req.query.page) || 1
    let query = Article.find()

    query
      .sort('-createdOn')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .then(articles => {
        res.render('articles/all', {
          articles: articles,
          hasPrevPage: page > 1,
          hasNextPage: articles.length > 0,
          prevPage: page - 1,
          nextPage: page + 1
        })
      })
  },
  detailsGet: (req, res) => {
      let articleId = req.params.id

      Article
        .findById(articleId)
        .then(article => {
            res.render('articles/details', article)
        })
  }, 

  editGet: (req, res) => {
    let articleId = req.params.id
    Article
      .findById(articleId)
      .then(article => {
        res.render('articles/edit', article)
      })
  },
  editPost: (req, res) => {
    let articleReq = req.body
    let articleId = req.params.id
    Article
      .findById(articleId)
      .then(article => {
        article.title = articleReq.title
        article.description = articleReq.description
        article
          .save()
          .then(article => {
            res.redirect('/article/list')
          })
           .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        res.render('articles/add', articleReq)
      })
      })
       .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        res.render('articles/add', articleReq)
      })
  },
 /* rent: (req, res) => {
    let userId = req.user._id
    let carId = req.params.id
    let days = parseInt(req.body.days)

    Car
      .findById(carId)
      .then(car => {
        if (car.isRented) {
          res.locals.globalError = 'Car is already rented!'
          res.render('cars/all')
          return
        }

        Renting
          .create({
            user: userId,
            car: carId,
            days: days,
            totalPrice: car.pricePerDay * days
          })
          .then(renting => {
            car.isRented = true
            car
              .save()
              .then(car => {
                res.redirect('/users/me')
              })
          })
          .catch(err => {

          })
      })
      .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        res.render('cars/all')
      })
  }*/
  deletetGet: (req, res) => {
    let articleId = req.params.id
    Article
      .findById(articleId)
      .then(article => {
        res.render('articles/delete', article)
      })
  },
  deletePost: (req, res) => {
    let articleReq = req.body
    let articleId = req.params.id
    Article
      .findById(articleId)
      .then(article => {
        article.deletetGet
          .save()
          .then(article => {
            res.redirect('/article/list')
          })
           .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        res.render('articles/add', articleReq)
      })
      })
       .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        res.render('articles/add', articleReq)
      })
  },
}
