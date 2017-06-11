const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', auth.isAuthenticated, controllers.home.about)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)

  app.get('/article/add', auth.isAuthenticated, controllers.articles.addGet)
  app.post('/article/add', auth.isAuthenticated, controllers.articles.addPost)
  app.get('/articles/edit/:id', auth.isAuthenticated, controllers.articles.editGet)
  app.post('/articles/edit/:id', auth.isAuthenticated, controllers.articles.editPost)
  app.get('/articles/delete/:id', auth.isAuthenticated, controllers.articles.deleteGet)
 
  app.get('/article/list', controllers.articles.all)
  app.get('/article/details/:id', auth.isAuthenticated, controllers.articles.detailsGet)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
