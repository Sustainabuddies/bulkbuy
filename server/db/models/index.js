const User = require('./user')
const ListItem = require('./list-item')
const Trip = require('./trip')
const Rating = require('./rating')

User.belongsToMany(Trip, {as: 'Subscriber', through: 'TripSubscribers'})
Trip.belongsToMany(User, {as: 'SubscriberTrip', through: 'TripSubscribers'})

User.hasMany(Trip, {as: 'Buyer'})
Trip.belongsTo(User)

Trip.hasMany(ListItem)
ListItem.belongsTo(Trip)

ListItem.hasOne(User)
User.belongsTo(ListItem)

module.exports = {
  User,
  ListItem,
  Trip,
  Rating
}
