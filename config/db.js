var mysql =require('mysql');
var db = mysql.createConnection({

  host:'localhost',
  user:'root',
  password:'',
  database:'app'

});
db.connect((err)=>{
  if(err){
    throw err;
  }
  console.log("db connected");
})

global.db=db;