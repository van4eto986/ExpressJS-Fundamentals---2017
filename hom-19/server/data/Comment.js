const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let commentSchema = new mongoose.Schema({
  content: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  createdOn: { type: Date, default: Date.now() },
  user: { type: ObjectId, required: true, ref: 'User' },
  thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' } 
})

let Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment