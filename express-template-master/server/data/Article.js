const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let articleSchema = new mongoose.Schema({
  title: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  description: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  createdOn: { type: Date, default: Date.now() },
  user: { type: ObjectId, required: true, ref: 'User' }
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article
