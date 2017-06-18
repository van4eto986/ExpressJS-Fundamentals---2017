const Answer = require('../data/Messages')
const Thread = require('../data/Thread')

module.exports = {
  addPost: (req, res) => {
    let id = req.params.id
    let messagesReq = req.body
    if (!req.user.isBlocked) {
      Messages.create({
        thread: id,
        author: req.user._id,
        content: messagesReq.content
      }).then((messages) => {
        Thread.findById(id).populate('author').then(thread => {
          thread.messages.push(messages._id)
          thread.save().then(thread => {
            Messages.find({thread: thread._id.toString()}).populate('author').sort('date').then(messages => {
              if (req.user) {
                res.render('thread/view', {
                  thread: thread,
                  messages: messages,
                  hasLiked: req.user.likedThreads.indexOf(thread._id) > -1
                })
              } else {
                res.render('thread/view', {
                  thread: thread,
                  messages: messages
                })
              }
            })
          })
        })
      })
    } else {
      res.redirect('/')
    }
  },
  like: (req, res) => {
    let id = req.params.id
    Messages.findById(id).populate('author').then(messages => {
      messages.likes = messages.likes + 1
      messages.save().then(messages => {
        User.findByIdAndUpdate(req.user._id, {$addToSet: {likedMessages: messages._id}}).then((user) => {
          res.redirect(`/`)
        })
      })
    })
  },
  dislike: (req, res) => {
    let id = req.params.id
    Messages.findById(id).populate('author').then(messages => {
      messages.likes = messages.likes - 1
      messages.save().then(messages => {
        User.findByIdAndUpdate(req.user._id, {$pull: {likedMessages: {$in: [messages._id]}}}).then((user) => {
          res.redirect(`/`)
        })
      })
    })
  }
}