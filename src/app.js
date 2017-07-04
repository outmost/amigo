'use strict'

const express = require('express')
const app = express()
const helmet = require('helmet')
const RateLimit = require('express-rate-limit')
const routes = require('./routes')

// Security
app.use(helmet())
app.disable('x-powered-by')

// Rate limiting
// app.enable('trust proxy') // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

const limiter = new RateLimit({
  windowMs: 10 * 1000, // 10 second minutes
  max: 50 // limit each IP to 50 requests per windowMs
})

// Routes
app.use('/', routes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

const port = process.env.PORT || 3000

// Listen, only if app (prevents tests from trying to open a second listen)
if (!module.parent) {
  // apply limiter to all requests other than testing
  app.use(limiter)
  app.listen(port, () => {
    console.log('Server listening on port 3000')
  })
}

module.exports = app
