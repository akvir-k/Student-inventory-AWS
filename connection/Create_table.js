const knex= require('./knex_connection');
    knex.schema.hasTable('signup').then(function(exists) {
        if (!exists) {
          return knex.schema.createTable('signup', function(t) {
            t.increments('id').primary();
            t.string('firstName', 100);
            t.string('lastName', 100);
            t.bigInteger('mobileNo',100);
            t.string('email',100).unique();
            t.string('password',100);
          });
          
        }
      });
    knex.schema.hasTable('admin').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('admin', function(t) {
          t.increments('id').primary();
          t.string('firstName', 100);
          t.string('lastName', 100);
          t.bigInteger('mobileNo',100);
          t.string('email',100).unique();
          t.string('password',100);
          t.string('key',100);
        });
        
      }
    });

    knex.schema.hasTable('NavgurukulBed').then((exist)=>{
      if(!exist){
        return knex.schema.createTable('NavgurukulBed',(t)=>{
          t.increments('id').primary();
          t.integer('bed',100).unique()
          t.string('side',100)
          t.integer('roomNo',100)
        });
      }
    });

    knex.schema.hasTable('Assign_beds').then((exist)=>{
      if(!exist){
        return knex.schema.createTable('Assign_beds',(t)=>{
          t.string('email',100).unique();
          t.integer('Currunt_bed',100);
          t.string('CurruntBedside',100);
          t.integer('Currunt_roomNo',100)
          t.integer('Previous_Bed',100);
          t.string('PreviousSide',100);
          t.integer('Previous_roomNo',100)
        });
      }
    });

    knex.schema.hasTable('userPics').then((exist)=>{
      if(!exist){
        return knex.schema.createTable('userPics',(t)=>{
          t.increments('id').primary()
          t.string('email').unique().references('signup.email')
          t.string('image_link',1000)
        });   
      }
    });
