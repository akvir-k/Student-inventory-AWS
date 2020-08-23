const express= require('express');
const Jwt= require('jsonwebtoken');
const app = express()
const table= require('./connection/Create_table')
const bodyparser= require("body-parser")
const cors= require('cors')
const path= require('path')
const jwt= require('jsonwebtoken');
const env= require('dotenv').config()

const knex= require('./connection/knex_connection');

app.use(cors());
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json())



app.use('/signup',Signup=express.Router())
require('./router/signup')(Signup,knex)

app.use('/login',Login=express.Router())
require('./router/login')(Login,knex,jwt)

app.use('/',upload=express.Router())
require('./router/upload')(upload,knex,jwt)


app.use('/',Addbed=express.Router())
require('./router/AddBed')(Addbed,jwt,knex)

app.use('/',shuffule=express.Router())
require('./router/suffule')(shuffule,jwt,knex)


app.listen(4000,(req,res)=>{
    console.log('server start.....')
})