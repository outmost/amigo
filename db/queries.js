'use strict'

const knex = require('./knex.js')

function Messages () {
  return knex('Messages')
}

// *** queries *** //

function addMessage (doc) {
  return Messages()
  .returning('id')
  .insert({text: doc})
}

function getAll () {
  return Messages()
  .select()
}

function getById (id) {
  return Messages()
  .where({id: id})
  .select()
}

module.exports = {
  addMessage: addMessage,
  getAll: getAll,
  getById: getById
}
