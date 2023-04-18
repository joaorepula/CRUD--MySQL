const Sequelize = require('sequelize');
const db = require('./db');

const Implementacao = db.define('users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});

Implementacao.sync();

module.exports = Implementacao;