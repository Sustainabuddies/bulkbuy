const Sequelize = require('sequelize')
const db = require('../db')

const Rating = db.define('rating', {
  raterId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  personRatingId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Rating
