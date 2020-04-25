'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Trip} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      username: 'cody4lyfe',
      streetAddress: '89 E 42nd St',
      city: 'New York',
      state: 'New York',
      zip: '10017'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      username: 'murphyDog',
      streetAddress: '405 Lexington Ave',
      city: 'New York',
      state: 'New York',
      zip: '10174'
    })
  ])

  const trips = await Promise.all([
    Trip.create({
      exchangePointLatitude: 40.791287,
      exchangePointLongitude: -73.974167,
      storeName: 'Costco',
      storeLatitude: 40.715435,
      storeLongitude: -73.965895,
      tripDate: new Date()
    }),
    Trip.create({
      exchangePointLatitude: 40.794349,
      exchangePointLongitude: -73.972322,
      storeName: 'BJs',
      storeLatitude: 40.719078,
      storeLongitude: -74.010613,
      tripDate: new Date()
    })
  ])
  await trips[0].setBuyer(users[0])
  await trips[0].addSubscriber(users[1])
  await trips[1].setBuyer(users[1])
  await trips[1].addSubscriber(users[0])

  console.log(`seeded ${users.length} users, ${trips.length} trips`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
