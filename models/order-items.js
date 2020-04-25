
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../utils/database');

const OrderItem = sequelize.define('orderItem',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER
    }
});

module.exports = OrderItem;