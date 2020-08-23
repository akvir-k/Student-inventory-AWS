const option={
    client:'mysql',
    connection:{
        host:'localhost',
        user:'root',
        password:'aman1234',
        database:'students_inventory'
    }
}

const connection = require('knex')(option)

module.exports= connection;