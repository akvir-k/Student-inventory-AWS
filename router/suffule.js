

module.exports = (shuffule, jwt, knex) => {

    shuffule
        .post('/shuffule', async (req, res) => {

            console.log(req.body)
            var student = knex.select('firstName', 'lastName', 'email').from('signup')
            var students_data = await student.then((data) => {
                return data;
            })

            var bed = knex.select('*').from('NavgurukulBed')
            var bed_Data = await bed.then((data) => {
                return data;
            })

            // console.log(students_data)
            var students_data = JSON.parse(JSON.stringify(students_data))
            var bed_Data = JSON.parse(JSON.stringify(bed_Data))

            let New_data=[]
            for (pick of students_data) {

                const random = Math.floor(Math.random() * bed_Data.length);
                
                await knex.select('*').from('Assign_beds').where('email', pick.email)
                
                    .then(result => {
    
                        if (result.length>0) {
                            
                            if (result[0].Currunt_roomNo !== bed_Data[random].roomNo) {

                                let dict = {}
                                dict.email=pick.email
                                dict.Currunt_bed = bed_Data[random].bed
                                dict.CurruntBedside = bed_Data[random].side
                                dict.Currunt_roomNo = bed_Data[random].roomNo
                                dict.Previous_Bed=result[0].Currunt_bed
                                dict.PreviousSide=result[0].CurruntBedside
                                dict.Previous_roomNo= result[0].Currunt_roomNo   
                                
                                New_data.push(dict)

                                knex('Assign_beds').where('email',result[0].email).del()
                                .then(()=>{
                                    knex.from('Assign_beds').insert(dict)
                                    .then()
                                })
                                
                                bed_Data.splice(random,1)

                            }else{
                                students_data.push(pick)
                                
                            }
                        }else{
                            let dict = {}
                            dict.email=pick.email
                            dict.Currunt_bed = bed_Data[random].bed
                            dict.CurruntBedside = bed_Data[random].side
                            dict.Currunt_roomNo = bed_Data[random].roomNo

                            New_data.push(dict)
                            knex.from('Assign_beds').insert(dict)
                            .then()
                        }
                        
                    })
                
            }
            res.send('ok')

            
        })


        .get('/getShuffuleData',(req,res)=>{

            knex.select('*').from('signup')
            .join('Assign_beds','signup.email','Assign_beds.email')
            .join('userPics')
            .orderBy('firstName')
            .then(data=>{

                res.send(data)
            })
            .catch(err=>{
                res.send(err)
            })
        })



}




