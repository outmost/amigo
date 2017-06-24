/* eslint-env mocha */

// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../src/app.js')
// Standard will complain unless we disable linting for the next line.
let should = chai.should()  // eslint-disable-line

chai.use(chaiHttp)

// Test the /GET route
describe('/GET message/:id', () => {
  it('it should GET a message', (done) => {
    chai.request(server)
          .get('/messages/12345')
          .end((err, res) => {
            should.not.exist(err)
            res.should.have.status(200)
            res.should.be.a('object')
            res.text.should.be.eql('12345')
            done()
          })
  })
})

// Test the /POST route
describe('/POST message/:id', () => {
  it('it should POST a message', (done) => {
    chai.request(server)
          .post('/messages')
          .send('this is a message')
          .end((err, res) => {
            should.not.exist(err)
            res.should.have.status(200)
            res.should.be.a('object')
            res.text.should.be.eql('ok')
            done()
          })
  })
})
