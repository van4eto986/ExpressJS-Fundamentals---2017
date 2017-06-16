const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let postSchema = new mongoose.Schema({
  title: {type: String, required: REQUIRED_VALIDATION_MESSAGE},
  description: {type: String, required: REQUIRED_VALIDATION_MESSAGE},
  createdOn: { type: Date, default: Date.now() },
  lastAnswer: {type: Date, default: Date.now()},
  author: {type: ObjectId, required: true, ref: 'User'},
  comments: [{type: ObjectId, ref: 'Comment'}],
  views: {type: Number, default: 0},
  likes: [{type: ObjectId, ref: 'User'}]
})

let Post = mongoose.model('Post', postSchema)

module.exports = Post
