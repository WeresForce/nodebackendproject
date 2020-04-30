const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodebackend','root','',{dialect:'mysql',host: 'localhost',"storage": "./session.sqlite"});


module.exports = sequelize;