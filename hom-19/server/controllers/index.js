const home = require('./home-controller')
const users = require('./users-controller')
const threads = require('./threads-controller')
//const comments = require('./comments-controller')

module.exports = {
  home: home,
  users: users,
  threads: threads
  //comments: comments
}
