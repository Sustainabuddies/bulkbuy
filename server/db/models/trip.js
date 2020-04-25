const Sequelize = require('sequelize')
const db = require('../db')

const Trip = db.define('trip', {
  exchangePointLatitude: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  exchangePointLongitude: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  store: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tripDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
})

module.exports = Trip
