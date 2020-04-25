const Sequelize = require('sequelize')
const db = require('../db')

const Trip = db.define('trip', {
  dropOffLatitude: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dropOffLongitude: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  store: {
    type: Sequelize.STRING,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
})

module.exports = Trip
