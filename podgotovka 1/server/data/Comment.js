const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let postSchema = new mongoose.Schema({
  text: {type: String, required: REQUIRED_VALIDATION_MESSAGE},
  createdOn: { type: Date, default: Date.now() },
  author: {type: ObjectId,  required: true, ref: 'User'},
  post: {type: ObjectId,  required: true, ref: 'Post'}
})

let Comment = mongoose.model('Comment', postSchema)

module.exports = Comment
