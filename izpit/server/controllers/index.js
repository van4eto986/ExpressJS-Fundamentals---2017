const home = require('./home-controller')
const users = require('./users-controller')
const thread = require('./thread-controller')
const messages = require('./messages-controller')

module.exports = {
  home: home,
  users: users,
  thread: thread,
  messages: messages
}
