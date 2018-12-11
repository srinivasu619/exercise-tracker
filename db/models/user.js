const { db } = require('../setup');
const Sequelize = require('sequelize');
const DT = Sequelize.DataTypes;

module.exports = db.define('users', {
    username: {
        type: DT.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: DT.STRING,
        allowNull: false
    }
});