const mongoose = require('mongoose')

let messagesSchema = mongoose.Schema({
  thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: mongoose.Schema.Types.Date, default: Date.now },
  content: { type: mongoose.Schema.Types.String,
    minlength: 1,
    maxlength: 1000,
    required: true}
})

let Messages = mongoose.model('Messages', messagesSchema)

module.exports = Messages