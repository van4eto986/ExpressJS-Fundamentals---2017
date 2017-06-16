const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const Comment = mongoose.model('Comment')
const errorHandler = require('../utilities/error-handler')

module.exports = {
  addComment: (req, res) => {
    let reqComment = req.body

    Post.findById(reqComment.post)
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

        Comment.create({
          text: reqComment.text,
          post: reqComment.post,
          author: res.locals.currentUser._id
        })
          .then(comment => {
            post.comments.push(comment)
            post.lastAnswer = comment.createdOn
            post.save()
              .then(p => {
                res.render('posts/post', {post: p})
              })
          })
          .catch(error => {
            let message = errorHandler.handleMongooseError(error)
            res.locals.globalError = message
            res.render('posts/post', {comment: reqComment, post: post})
          })
      })
  }
}
