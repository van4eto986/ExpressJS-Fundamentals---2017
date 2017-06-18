const mongoose = require('mongoose')

let threadSchema = mongoose.Schema({
  title: { type: mongoose.Schema.Types.String, required: true },
  content: { type: mongoose.Schema.Types.String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: mongoose.Schema.Types.Date, required: true, default: Date.now },
  messages: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Messages'} ],
  MessagesDate: { type: mongoose.Schema.Types.Date, default: Date.now }
})

let Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread