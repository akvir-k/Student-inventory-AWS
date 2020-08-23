module.exports=(signup,knex)=>{


    signup
        .post('/student',(req,res)=>{

            knex('signup').insert(req.body.name)
            
            .then(result=>{
                res.send(result)
            })
            .catch(err=>{
                res.send(err);
            })
        })

        .post('/admin',(req,res)=>{
            let key="my"
            console.log(req.body)
            if ((req.body.name.key)===key){
                knex('admin').insert(req.body.name)
                .then(result=>{
                    console.log(result)
                    res.send(result)
                })
                .catch(err=>{
                    res.send(err);
                })
            }
            else{
                res.send("you don't have authority to singup")
            }

        })
}