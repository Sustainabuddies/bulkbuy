const Sequelize = require('sequelize')
const db = require('../db')

const Trip = db.define('trip', {
  exchangePointLatitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  exchangePointLongitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  storeName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  storeLatitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  storeLongitude: {
    type: Sequelize.DECIMAL,
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
