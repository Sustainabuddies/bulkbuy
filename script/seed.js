'use strict'

const db = require('../server/db')
const {User, Trip, Rating, ListItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.bulkCreate(
      [
        {
          email: 'cody@email.com',
          password: '123',
          username: 'cody4lyfe',
          streetAddress: '89 E 42nd St',
          city: 'New York',
          state: 'New York',
          zip: '10017'
        },
        {
          email: 'murphy@email.com',
          password: '123',
          username: 'murphyDog',
          streetAddress: '405 Lexington Ave',
          city: 'New York',
          state: 'New York',
          zip: '10174'
        }
      ],
      {returning: true}
    )
  ])
  //Promise returns an array with an array of user objects
  const user1 = users[0][0]
  const user2 = users[0][1]

  const trips = await Promise.all([
    Trip.bulkCreate(
      [
        {
          exchangePointLatitude: 40.791287,
          exchangePointLongitude: -73.974167,
          storeName: 'Costco',
          storeLatitude: 40.715435,
          storeLongitude: -73.965895,
          tripDate: new Date(),
          buyerId: 1
        },
        {
          exchangePointLatitude: 40.794349,
          exchangePointLongitude: -73.972322,
          storeName: 'BJs',
          storeLatitude: 40.719078,
          storeLongitude: -74.010613,
          tripDate: new Date(),
          buyerId: 2
        }
      ],
      {returning: true}
    )
  ])
  //Promise returns an array with an array of trip objects
  const trip1 = trips[0][0]
  const trip2 = trips[0][1]

  const ratings = await Promise.all([
    Rating.bulkCreate(
      [
        {
          rating: 5,
          userId: 1,
          raterId: 2
        },
        {
          rating: 1,
          userId: 2,
          raterId: 1
        }
      ],
      {returning: true}
    )
  ])

  await trip1.addSubscriber(user2)
  await trip2.addSubscriber(user1)

  const listItems = await Promise.all([
    ListItem.bulkCreate([
      {
        tripId: 1,
        userId: 1,
        type: 'buyer',
        name: 'toilet paper',
        price: 0.84,
        qtyAvailable: 5,
        qtyTotal: 5,
        unitType: 'pack',
        isAccepted: 'approved'
      },
      {
        tripId: 1,
        userId: 2,
        type: 'subscriber',
        name: 'toilet paper',
        price: 0.84,
        qtyAvailable: 0,
        qtyTotal: 5,
        unitType: 'pack',
        isAccepted: 'approved',
        amountDue: 4.2
      },
      {
        tripId: 2,
        userId: 2,
        type: 'buyer',
        name: 'water bottle',
        price: 0.84,
        qtyAvailable: 5,
        qtyTotal: 5,
        unitType: 'single',
        isAccepted: 'approved'
      },
      {
        tripId: 2,
        userId: 1,
        type: 'subscriber',
        name: 'water bottle',
        price: 0.84,
        qtyAvailable: 0,
        qtyTotal: 5,
        unitType: 'single',
        isAccepted: 'approved',
        amountDue: 4.2
      }
    ])
  ])

  console.log(
    `seeded ${users.length} users, ${trips.length} trips, ${
      ratings.length
    } ratings, ${listItems.length} list items`
  )
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
