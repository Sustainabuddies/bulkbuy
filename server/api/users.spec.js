/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    const codysUsername = 'cody4lyfe'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        username: codysUsername,
        streetAddress: '89 E 42nd St',
        city: 'New York',
        state: 'New York',
        zip: '10017'
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].username).to.be.equal(codysUsername)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
