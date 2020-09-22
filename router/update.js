const otpGenerator = require('otp-generator')
const nodemailer= require('nodemailer')
const sendgrid= require('nodemailer-sendgrid-transport')

// const transport= nodemailer.createTransport(sendgrid({
//     auth:{
//         api_key:"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"
//     }
// }));

module.exports=(router,jwt,knex)=>{


    router.put('/update/password',(req,res)=>{

        console.log(req.body)
        jwt.verify(req.body.token, req.body.key,function(err,data){
            console.log(data)
            if(!err){
                knex.select('*').from('signup')
                .where('email',data.email)
                .then((resp)=>{
                    console.log(resp)
                    if(resp[0].password===req.body.oldPassword){
                       
                        knex('signup')
                        .where('email',data.email)
                        .update("password",req.body.newPassword)
                        .then((ResponseValue)=>{
                            res.send([ResponseValue])
                        })
                    }else{
                        res.send("oldpassword does not match")
                    }
                })
            }
        })
        
    })

    router.put('/createOtp',(req,res)=>{
        
        otp=otpGenerator.generate(6, { upperCase: false, specialChars: false,alphabets:false });
        res.send(otp)
    })

    router.put('/update/image',(req,res)=>{
        jwt.verify(req.body.token, req.body.key,function(err,data){
            console.log(data)
            if(!err){
                knex('userPics')
                    .where('email',data.email)
                    .update("image_link",req.body.url)
                    .then((UpdateResp)=>{
                        
                        res.send([UpdateResp])
                    })
            }
        })
    })

}