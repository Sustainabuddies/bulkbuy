const Sequelize = require('sequelize')
const db = require('../db')

const Rating = db.define('rating', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Rating
