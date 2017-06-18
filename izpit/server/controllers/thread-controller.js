const Thread = require('../data/Thread')
const User = require('../data/User')
const errorHandler = require('../utilities/error-handler')

module.exports = {
  addGet: (req, res) => {
    res.render('thread/add')
  },
  addPost: (req, res) => {
    let threadReq = req.body
    let userId = req.user._id
    Thread
      .create({
        title: threadReq.title,
        content: threadReq.content,
        author: req.user._id
      })
      .then(thread => {
        res.redirect('/')
      })
      .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        res.render('thread/add', threadReq)
      })
  },
  findUser: (req, res) => {
    let search = req.query.mytest
    let userName = search
    Thrend.findOne({title: title}).then(userName => {
      res.render('/')
    })
  }
}