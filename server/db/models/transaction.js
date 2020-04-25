const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  receipt: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Transaction
