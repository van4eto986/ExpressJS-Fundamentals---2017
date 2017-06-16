const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const errorHandler = require('../utilities/error-handler')

module.exports = {
  addGet: (req, res) => {
    res.render('posts/add')
  },
  addPost: (req, res) => {
    let postReq = req.body
    let user = res.locals.currentUser._id

    let post = {
      title: postReq.title,
      description: postReq.description,
      author: user
    }

    Post.create(post)
      .then(p => {
        res.redirect('/posts/list')
      })
      .catch(error => {
        let message = errorHandler.handleMongooseError(error)
        res.locals.globalError = message
        res.render('posts/add', postReq)
      })
  },
  list: (req, res) => {
    let page = Number(req.query.page) || 1
    let itemsPerPage = 5

    Post
      .find({})
      .sort('-lastAnswer')
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .then(posts => {
        res.render('posts/list', {
          posts: posts,
          hasPrevPage: page > 1,
          hasNextPage: posts.length > 0,
          prevPage: page - 1,
          nextPage: page + 1
        })
      })
  },
  postGet: (req, res) => {
    let id = req.params.id
    Post
      .findById(id)
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'author',
          model: 'User'
        }
      })
      .then(post => {
        if (!post) {
          res.sendStatus(404)
          return
        }

        post.views = Number(post.views) + 1
        post.save()

        if (req.user) {
          if (post.likes.indexOf(req.user.id) < 0) {
            post.like = true
          } else {
            post.dislike = true
          }
        }

        post.comments = post.comments.sort((a, b) => a.createdOn > b.createdOn)
        res.render('posts/post', {post: post})
      })
  },
  like: (req, res) => {
    let id = req.params.id
    Post.findById(id)
      .then(post => {
        if (!post) {
          res.sendStatus(404)
          return
        }

        post.likes.push(req.user.id)
        post.save()
          .then(p => {
            res.redirect(`/posts/${id}/${p.title}`)
          })
      })
  },
  dislike: (req, res) => {
    let id = req.params.id
    Post.findById(id)
      .then(post => {
        if (!post) {
          res.sendStatus(404)
          return
        }

        let index = post.likes.indexOf(req.user.id)
        post.likes.splice(index, 1)
        post.save()
          .then(p => {
            res.redirect(`/posts/${id}/${p.title}`)
          })
      })
  }
}
