const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let threadSchema = new mongoose.Schema({
  title: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  description: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  createdOn: { type: Date, default: Date.now() },
  user: { type: ObjectId, required: true, ref: 'User' },
  comments :  [ { type: mongoose.Schema.Types.ObjectId , ref: 'Comment'} ]
})

let Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread