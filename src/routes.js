'use strict'
const express = require('express')
const router = express.Router()

const queries = require('../db/queries')

// POST endpoint
router.post('/messages/', (req, res) => {
  let doc = ''
  // capture the POST data
  req.on('data', (data) => {
    doc = data.toString()
  })

  // send a response when finished
  req.on('end', () => {
    queries.addMessage(doc)
      .then((data) => {
        // success;
        const meessageId = {id: data[0]}
        res.send(meessageId)
      })
      .catch(error => {
        // error;
        res.status(400).send(error)
      })
  })
})

// GET all messages
router.get('/', (req, res) => {
  res.status(404).send('Nothing to see here')
})

// GET all messages
router.get('/messages', (req, res) => {
  queries.getAll()
      .then((data) => {
        res.send(data)
      })
    .catch((error) => {
      res.status(500).send(error)
    })
})

// GET endpoint
router.get('/messages/:id', (req, res) => {
  queries.getById(req.params.id)
      .then((data) => {
        let text = data[0].text
        res.send(text)
      })
    .catch((error) => {
      res.status(404).send(error)
    })
})

// Teapot
router.get('/teapot', (req, res) => {
  res.status(418).send("I'm a teapot.")
})

module.exports = router
