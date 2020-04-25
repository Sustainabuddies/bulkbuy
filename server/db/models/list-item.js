const db = require('../db');
const Sequelize = require('sequelize');

const ListItem = db.define('listItem', {
    type: {
        type: Sequelize.ENUM('buyer', 'subscriber'),
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0.0,
        validate: {
            isDecimal: true
        }
    },
    qtyAvailable: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    qtyTotal: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    unitType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAccepted: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        allowNull: false
    },
    amountDue: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        defaultValue: 0.0
    }
});

module.exports = ListItem;