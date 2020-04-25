
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../utils/database');

const Order = sequelize.define('order',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Order;