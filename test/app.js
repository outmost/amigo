/* eslint-env mocha */
'use strict'

// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/app.js')
const knex = require('../db/knex')
// Standard will complain unless we disable linting for the next line.
const should = chai.should()  // eslint-disable-line

chai.use(chaiHttp)

describe('GET Messages API', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest() })
    .then(() => { return knex.seed.run() })
  })

  afterEach(() => {
    return knex.migrate.rollback()
  })

// Test the /GET routes
  describe('/GET messages', () => {
    it('it should GET all message', (done) => {
      chai.request(server)
          .get('/messages')
          .end((err, res) => {
            console.log(res.body)
            should.not.exist(err)
            res.should.have.status(200)
            res.should.be.a('object')
            res.body.should.be.a('array')
            res.body[0].should.be.a('object')
            done()
          })
    })
  })

  describe('/GET message/:id', () => {
    it('it should GET a message when record matching supplied ID exists', (done) => {
      let message = {
        id: 1,
        text: 'this is a message'
      }
      chai.request(server)
          .get('/messages/' + message.id)
          .end((err, res) => {
            should.not.exist(err)
            res.should.have.status(200)
            res.should.be.a('object')
            res.text.should.be.eql(message.text)
            done()
          })
    })
    it('it should fail to GET a message when record with supplied ID does not exist', (done) => {
      let message = {
        id: 666
      }
      chai.request(server)
          .get('/messages/' + message.id)
          .end((err, res) => {
            should.exist(err)
            res.should.have.status(404)
            done()
          })
    })
    it('it should fail to GET a message when supplied ID is not number', (done) => {
      let message = {
        id: 'message'
      }
      chai.request(server)
          .get('/messages/' + message.id)
          .end((err, res) => {
            should.exist(err)
            res.should.have.status(404)
            done()
          })
    })
  })

  // Test the /POST route
  describe('/POST message', () => {
    it('it should POST a message', (done) => {
      chai.request(server)
          .post('/messages/')
          .send('this is a message')
          .end((err, res) => {
            should.not.exist(err)
            res.should.have.status(200)
            res.should.be.a('object')
            res.body.id.should.be.a('number')
            done()
          })
    })
  })
})
