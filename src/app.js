'use strict'

const express = require('express')
const app = express()
const routes = require('./routes')

app.use('/', routes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

const port = process.env.PORT || 3000

// Listen, only if app (prevents tests from trying to open a second listen)
if (!module.parent) {
  app.listen(port, () => {
    console.log('Server listening on port 3000')
  })
}

module.exports = app
