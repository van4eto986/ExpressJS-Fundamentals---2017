const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)
  app.get('/users/all', controllers.users.addUserGet)
  app.post('/users/all', controllers.users.addUserPost)
  app.post('/block/:id',controllers.users.block)
  app.post('/unblock/:id',controllers.users.unblock)

  app.get('/thread/add', auth.isAuthenticated, controllers.thread.addGet)
  app.post('/thread/add', auth.isAuthenticated, controllers.thread.addPost)
  app.post('/post/:id/:name', auth.isAuthenticated, controllers.messages.addPost)
  app.post('/like/:id', auth.isAuthenticated, controllers.messages.like)
  app.post('/dislike/:id', auth.isAuthenticated, controllers.messages.dislike)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
