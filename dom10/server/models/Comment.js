const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'
const ObjectId = mongoose.Schema.Types.ObjectId

let CommentSchema = new mongoose.Schema({
  author: String,
  comment: {type: String, required: REQUIRED_VALIDATION_MESSAGE},
  date: { type: Date, default: Date.now() },
  recipeId: { type: ObjectId, ref: 'Recipe' }
})
