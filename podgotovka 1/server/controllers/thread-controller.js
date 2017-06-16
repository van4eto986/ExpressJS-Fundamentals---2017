const Thread = require('../data/Thread')
const Category = require('../data/Category')
const Answer = require('../data/Answer')
const User = require('../data/User')
const Tag = require('../data/Tag')
const errorHandler = require('../utilities/error-handler')

module.exports = {
  addGet: (req, res) => {
    if (req.user.isBlocked) {
      res.redirect('/')
      return
    }
    Category.find().then(categories => {
      res.render('thread/add', {
        categories: categories
      })
    })
  },

  addPost: (req, res) => {
    if (req.user.isBlocked) {
      res.redirect('/')
      return
    }
    let threadReq = req.body
    Thread.create({
      title: threadReq.title,
      description: threadReq.description,
      category: threadReq.category,
      image: threadReq.image,
      author: req.user._id
    }).then(thread => {
      Category.findByIdAndUpdate(thread.category.toString(), {$addToSet: {threads: thread._id}}).then(() => {
        Tag.find({}).then(currentTags => {
          let tagPattern = /(#\w+)/g
          let text = thread.description
          let tags = text.match(tagPattern)
          let newTagNames = []
          for (let j in currentTags) {
            newTagNames.push(currentTags[j].tagName.toString())
          }
          for (let i in tags) {
            let newTag = tags[i].replace('#', '').toLowerCase()
            if (newTagNames.indexOf(newTag.toString()) === -1) {
              Tag.create({
                tagName: newTag.toString(),
                threadMsg: [thread._id]
              })
            } else {
              Tag.findOne({tagName: newTag.toString()}).then(tag => {
                tag.threadMsg.push(thread._id)
                tag.save()
              })
            }
          }
          res.redirect('/list')
        })
      })
    }).catch(err => {
      Category.find().then(categories => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        res.render('thread/add', {
          categories: categories,
          thread: threadReq
        })
      })
    })
  },
  viewThreadGet: (req, res) => {
    let id = req.params.id

    Thread.findById(id).populate('author').then(thread => {
      Answer.find({thread: thread._id.toString()}).populate('author').sort('date').then(answers => {
        thread.views = thread.views + 1
        thread.save().then(thread => {
          if (req.user) {
            res.render('thread/view', {
              thread: thread,
              answers: answers,
              hasLiked: req.user.likedThreads.indexOf(thread._id) > -1
            })
          } else {
            res.render('thread/view', {
              thread: thread,
              answers: answers
            })
          }
        })
      })
    })
  },
  viewTag: (req, res) => {
    let tagName = req.params.tagName
    Tag.findOne({tagName: tagName}).populate('threadMsg').then(tag => {
      res.render('tags/all', {tag: tag})
    })
  },
  findTag: (req, res) => {
    let search = req.query.mytest
    let tagName = search
    Tag.findOne({tagName: tagName}).populate('threadMsg').then(tag => {
      res.render('tags/all', {tag: tag})
    })
  },
  like: (req, res) => {
    let id = req.params.id
    Thread.findById(id).populate('author').then(thread => {
      thread.likes = thread.likes + 1
      thread.save().then(thread => {
        User.findByIdAndUpdate(req.user._id, {$addToSet: {likedThreads: thread._id}}).then((user) => {
          res.redirect(`/post/${thread._id}/${thread.title}`)
        })
      })
    })
  },
  dislike: (req, res) => {
    let id = req.params.id
    Thread.findById(id).populate('author').then(thread => {
      thread.likes = thread.likes - 1
      thread.save().then(thread => {
        User.findByIdAndUpdate(req.user._id, {$pull: {likedThreads: {$in: [thread._id]}}}).then((user) => {
          res.redirect(`/post/${thread._id}/${thread.title}`)
        })
      })
    })
  },
  editGet: (req, res) => {
    let id = req.params.id

    Thread.findById(id).then(thread => {
      Category.find().then(categories => {
        res.render('thread/edit', {
          thread: thread,
          categories: categories
        })
      })
    })
  },
  editPost: (req, res) => {
    let id = req.params.id
    let threadReq = req.body

    Thread.findById(id).then(thread => {
      let oldCategory = thread.category
      thread.title = threadReq.title
      thread.description = threadReq.description
      thread.category = threadReq.category
      thread.image = threadReq.image
      thread.save().then(() => {
        if (oldCategory.toString() !== threadReq.category) {
          Category.findByIdAndUpdate(oldCategory, {$pull: {threads: {$in: [thread._id]}}}).then(() => {
            Category.findByIdAndUpdate(thread.category, {$push: {threads: {_id: thread._id}}}).then(() => {
              res.redirect(`/post/${thread._id}/${thread.title}`)
            })
          })
        } else {
          res.redirect(`/post/${thread._id}/${thread.title}`)
        }
      })
    })
  },
  deleteGet: (req, res) => {
    let id = req.params.id

    Thread.findById(id).then(thread => {
      res.render('thread/delete', {thread: thread})
    })
  },
  deletePost: (req, res) => {
    let id = req.params.id

    Thread.findByIdAndRemove(id).then(thread => {
      Answer.remove({thread: id}).then(() => {
        Category.findByIdAndUpdate(thread.category.toString(), {$pull: {threads: {$in: [id]}}}).then(() => {
          res.redirect('/')
        })
      })
    })
  },
  all: (req, res) => {
    let pageSize = 20
    let page = Number(req.query.page) || 1

    Thread.find().populate('author').sort('-lastAnswerDate').skip((page - 1) * pageSize).limit(pageSize).then(threads => {
      res.render('thread/list', {
        threads: threads,
        hasPrevPage: page > 1,
        hasNextPage: threads.length === pageSize,
        prevPage: page - 1,
        nextPage: page + 1
      })
    })
  }
}
