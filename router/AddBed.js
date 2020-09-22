

module.exports = (bed, jwt, knex) => {

    bed
        .post('/addbed', (req, res) => {
            console.log(req.body)
            jwt.verify(req.body.forverify,req.body.secrateKey, function (err, data) {
                console.log(data)

                if (!err) {
                    knex.select('*').from('admin').where('email', data.email)
                        .then(exist => {
                            if (exist) {
                                knex.from('NavgurukulBed').insert(req.body.bedValue)
                                    .then((add) => {
                                        res.send(add)
                                    })
                                    .catch(err => {
                                        res.send(err)
                                    })
                            } else {
                                console.log(exist)
                            }
                        })
                }
                else {
                    console.log(err)
                }
            })
        })

        .get('/getbed', (req, res) => {
            knex('NavgurukulBed').orderBy('bed')
                .then(result => {
                    res.send(result)
                })
                .catch(err => {
                    res.send(err)
                })
        })

        .post('/deletebed', (req, res) => {
            
            console.log(req.body)

            jwt.verify(req.body.verify, 'admin', function (err, data) {

                if (!err) {
                    knex('NavgurukulBed').where('bed', req.body.bed).del()
                        .then(result => {
                            // console.log(result)
                            res.send(JSON.stringify(result))
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                else{
                    res.send(err)
                }
                
            })


        })
}



