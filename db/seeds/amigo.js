'use strict'

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('Messages').del()
    .then(() => {
      // Inserts seed entries one by one
      return knex('Messages').insert([
        {text: 'this is a message'}
      ])
    })
    .then(() => {
      return knex('Messages').insert([
        {text: 'this is a message too'}
      ])
    })
    .then(() => {
      return knex('Messages').insert([
        {text: 'this is a message, three'}
      ])
    })
  .catch((err) => {
    console.log(err)
  })
}
