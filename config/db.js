const{Pool}=require("pg");

const pool=new Pool({
    user:'Rudra',
    host:'localhost',
    database:'Employee',
    password:'Emp1@',
    post:5432

});

module.exports=pool;