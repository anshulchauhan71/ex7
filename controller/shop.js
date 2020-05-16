const {check, validationResult} = require('express-validator');

var configconnect = require('../config/db');


    

exports.ShopIndex= function(req,res){
 
    
    db.query("select * from products where category ='furniture' or category='home-decor' and homepage='1' order by id desc limit 8",(err,homeproduct)=>{
    db.query("select * from products where category ='lighting' or category='outdoor' and homepage='1' order by id desc limit 8",(err,loproduct)=>{
    db.query("select * from products where category ='bathroom' or category='kitchen-dining' and homepage='1' order by id desc limit 8",(err,kbproduct)=>{
    db.query("select * from products where category ='living' or category='bedroom' and homepage='1' order by id desc limit 8",(err,lbproduct)=>{
    db.query("select * from products where category ='plants' or category='seeds' and homepage='1' order by id desc limit 8",(err,psproduct)=>{
        
        
        
   
  res.render('frontend/store.ejs',{
             
                   req:req,
                   homeproducts:homeproduct,
                   loproduct:loproduct,
                   kbproduct:kbproduct,
                   lbproduct:lbproduct,
                   psproduct:psproduct,

       }) 
    })  
    })  
    })  
    })  
    })  
}; 
exports.ShopList= function(req,res){
  let category = req.params.productcategory;
        var numPerPage = 10;
var page = req.query.page?req.query.page:1;
    var skip = (page - 1)*numPerPage;
    var limit = skip +  ',' + numPerPage;
  

    db.query("select count(*) as count from products",function(err,countall){
            let productlist ='select * from products where category ="'+category+'" order by id desc limit '+numPerPage+' OFFSET '+skip;
      console.log(productlist);
        var countnew = countall[0].count/numPerPage;
    db.query(productlist,(err,homeproduct)=>{
 
       
   
  res.render('frontend/shop-list.ejs',{
             
                   req:req,
                   homeproducts:homeproduct,
      category:category,
                    count:countnew,
               
              currentPage:page,

       }) 
   
        
    })  
    })  
}; 