'use strict'

exports.up = (knex, Promise) => {
  return knex.schema.createTable('Messages', (table) => {
    table.increments()
    table.string('text').notNullable()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('Messages')
}
