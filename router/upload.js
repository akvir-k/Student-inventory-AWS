

module.exports=(upload,knex,jwt)=>{
    
    upload
        .post('/upload',(req,res)=>{

                console.log(req.body)
                
                jwt.verify(req.body.token, req.body.key,function(err,data){
                        if (!err){
                                let upload={
                                        email:data.email,
                                        image_link:req.body.data
                                }
                                knex.from('userPics').insert(upload)
                                .then((result)=>{
                                        res.send(result)
                                })
                                .catch(err=>{res.send(err)})
                        }       
                })
        })

        .post('/getStudentData',(req,res)=>{

                console.log(req.body)
                jwt.verify(req.body.token,req.body.key,function(err,data){
                        if (!err){
                                knex.select('*').from('signup')
                                .join('Assign_beds','Assign_beds.email','signup.email')
                                .join('userPics','signup.email','userPics.email')
                                .where('signup.email',data.email)
                                .then((data)=>{
                                        res.send(data)
                                })
                                .catch(err=>{
                                        res.send(err)
                                })
                        }
                })
        })
        
        .post ('/checkUpload',(req,res)=>{
                jwt.verify(req.body.token,req.body.key, function(err,data){
                        if(!err){
                                knex.select('*').from('userPics').where('email',data.email)
                                .then(data=>{
                                        console.log(data)
                                        res.send(data)
                                })
                                .catch(err=>{
                                        res.send(err)
                                })
                        }
                })
        })
}