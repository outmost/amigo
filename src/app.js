const express = require('express')
const app = express()

// POST endpoint
app.post('/messages/', function (req, res) {
  // capture the POST data
  req.on('data', (data) => {
    console.log(data.toString())
  })

  // send a response when finished
  req.on('end', () => {
    res.send('ok')
  })
})

// GET endpoint
app.get('/messages/:id', function (req, res) {
  res.send(req.params.id)
})

// Listen
app.listen(3000, function () {
  console.log('Server listening on port 3000')
})

module.exports = app
