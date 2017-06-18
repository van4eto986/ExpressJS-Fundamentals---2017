const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')
const Thread = require('../data/Thread')
const Answer = require('../data/Messages')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },
  registerPost: (req, res) => {
    let reqUser = req.body
    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

    User.create({
      username: reqUser.username,
      firstName: reqUser.firstName,
      lastName: reqUser.lastName,
      salt: salt,
      hashedPass: hashedPassword
    }).then(user => {
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.render('users/register', user)
        }

        res.redirect('/')
      })
    })
  },
  loginGet: (req, res) => {
    res.render('users/login')
  },
  loginPost: (req, res) => {
    let reqUser = req.body
    User
      .findOne({ username: reqUser.username }).then(user => {
        if (!user) {
          res.locals.globalError = 'Invalid user data'
          res.render('users/login')
          return
        }

        if (!user.authenticate(reqUser.password)) {
          res.locals.globalError = 'Invalid user data'
          res.render('users/login')
          return
        }

        req.logIn(user, (err, user) => {
          if (err) {
            res.locals.globalError = err
            res.render('users/login')
          }

          res.redirect('/')
        })
      })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },
  profile: (req, res) => {
    let username = req.params.username
    User.findOne({username: username})
      .then(user => {
        Thread.find({author: user._id})
          .then(threads => {
            Messages.find({author: user._id}).populate('thread')
              .then(messages => {
                res.render('users/profile', {
                user: user,
                threads: threads,
                messages: messages
              })
           })
        })
     })
  },
  block: (req, res) => {
    let id = req.params.id
    User.findByIdAndUpdate(id, {$set: {isBlocked: true}}).then(user => {
      res.redirect(`/profile/${user.username}`)
    })
  },
  unblock: (req, res) => {
    let id = req.params.id
    User.findByIdAndUpdate(id, {$set: {isBlocked: false}}).then(user => {
      res.redirect(`/profile/${user.username}`)
    })
  },
   addUserGet: (req, res) => {
    User.find({roles: {$ne: 'user._id'}}).then(users => {
      res.render('users/all', {
        users: users
      })
    })
  },

  addUserPost: (req, res) => {
    let userId = req.body.user
    User.findByIdAndUpdate(userId, {$addToSet: {roles: 'User'}}).then(() => {
      res.redirect('/all')
    })
  },
  all: (req, res) => {
    User.find({roles: {$in: ['User']}}).then(user => {
      res.render('users/all', {
        users: users,
        msg: res.locals.globalMessage
      })
    })
  }
}
