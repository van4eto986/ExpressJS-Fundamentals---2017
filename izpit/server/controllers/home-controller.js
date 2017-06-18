const Thread = require('../data/Thread')

module.exports = {
  index: (req, res) => {
    Thread.find().populate('author').sort('-date').then(threads => {
      res.render('home/index', {
        threads: threads
      })
    })
  }
}
