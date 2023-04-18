const Sequelie = require('sequelize');

const sequelize = new Sequelie("repula","root","123456",{
    host:'localhost',
    dialect:'mysql'
});

sequelize.authenticate()
    .then(function(){
        console.log("conectou")  

    }).catch(function (){
      console.log("erro")  
    })

module.exports = sequelize;