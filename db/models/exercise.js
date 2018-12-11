const { db } = require('../setup');
const Sequelize = require('sequelize');
const DT = Sequelize.DataTypes;

module.exports = db.define('exercises', {
    description: {
        type: DT.STRING,
        allowNull: false
    },
    duration: {
        type: DT.INTEGER,
        allowNull: false
    },
    date: {
       type: DT.DATE,
       defaultValue: DT.NOW 
    }
});