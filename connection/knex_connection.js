const option={
    client:'mysql',
    connection:{
        host:process.env.host,
        user:process.env.user,
        password:process.env.password,
        database:process.env.database
    }
}

const connection = require('knex')(option)

module.exports= connection;