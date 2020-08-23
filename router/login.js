module.exports=(login,knex,jwt)=>{


    login
        .post('/student',(req,res)=>{
            console.log(req.body)

            knex.select('*') .from('signup') .where( 'email', req.body.email)
            .then((result)=>{
                if (result[0].password==req.body.password){
                    // console.log(result[0].email)
                    let genrate= jwt.sign({"email":result[0].email},'student')
                    console.log(genrate)
                    res.send({token:genrate,key:"student"})
                }
                else{
                    res.send("failed")
                }
            })
            .catch(err=>{
                res.send(err)
            })
        })

        .post('/admin',(req,res)=>{
            console.log(req.body)

            knex.select('*').from('admin').where('email',req.body.email)
            .then((result)=>{
                if(result[0].password==req.body.password){ 
                    let token= jwt.sign({'email':result[0].email},process.env.adminsecrate)
                    res.send({token:token,key:process.env.adminsecrate})
                }
                else{
                    res.send('failed')
                }
            })
            .catch(err=>{
                res.send(err)
            })
        })
}