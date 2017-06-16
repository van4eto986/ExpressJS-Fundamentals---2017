const mongoose = require('mongoose')
const User = mongoose.model('User')
const Post = mongoose.model('Post')
const Comment = mongoose.model('Comment')

module.exports = {
  addGet: (req, res) => {
    User.find({ 'roles': { '$ne': 'Admin' }})
      .then(users => {
        res.render('admins/add', {users: users})
      })
  },
  addPost: (req, res) => {
    let reqUser = req.body
    User.findById(reqUser.user)
      .then(user => {
        if (!user) {
          res.sendStatus(404)
          return
        }

        user.roles.push('Admin')
        user.save()
          .then(u => {
            res.locals.globalMessage = `User ${u.username} is added like Admin`
            res.redirect('/admins/all')
          })
      })
  },
  all: (req, res) => {
    Post
      .find({})
      .sort('-createdOn')
      .then(posts => {
        res.render('posts/list', {posts: posts})
      })
  },
  deleteComment: (req, res) => {
    let id = req.params.id
    Comment.findByIdAndRemove(id)
      .then(comment => {
        Post.findById(comment.post)
          .then(post => {
            let index = post.comments.indexOf(comment._id)
            post.comments.splice(index, 1)
            post.save()
              .then(p => {
                res.redirect('/posts/list')
              })
          })
      })
      .catch(error => {
        console.log(error)
      })
  },
  deletePost: (req, res) => {
    let id = req.params.id
    Post.findByIdAndRemove(id)
      .then(post => {
        for (let comment of post.comments) {
          Comment.findByIdAndRemove(comment)
            .then(c => {
              console.log(c + 'is removed')
            })
            .catch(error => {
              console.log(error)
            })
        }

        res.redirect('/posts/list')
      })
  },
  editPostGet: (req, res) => {
    let id = req.params.id
    Post.findById(id)
      .then(post => {
        if (!post) {
          res.locals.globalError = 'Post is not found!'
          res.redirect('/admins/all')
          return
        }

        res.render('admins/editPost', {post: post})
      })
  },
  editPostPost: (req, res) => {
    let id = req.params.id
    let postReq = req.body
    Post.findByIdAndUpdate(id, {title: postReq.title, description: postReq.description}, (err) => {
      if (err) {
        res.locals.globalError = err
        res.render('admins/editPost', {post: postReq})
        return
      }

      res.redirect('/admins/all')
    })
  }
}
