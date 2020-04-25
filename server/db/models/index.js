const User = require('./user')
// const ListItem = require('./list-item')
const Trip = require('./trip')
const Rating = require('./rating')

User.belongsToMany(Trip, {as: 'subscriber', through: 'trip_subscribers'})
Trip.belongsToMany(User, {as: 'subscriber', through: 'trip_subscribers'})

User.hasMany(Trip, {as: 'buyer'})
Trip.belongsTo(User, {as: 'buyer'})

// Trip.hasMany(ListItem)
// ListItem.belongsTo(Trip)

// ListItem.hasOne(User)
// User.belongsTo(ListItem)

Rating.belongsTo(User, {as: 'rater'})
Rating.belongsTo(User, {as: 'user'})
User.hasMany(Rating)

module.exports = {
  User,
  // ListItem,
  Trip,
  Rating
}
