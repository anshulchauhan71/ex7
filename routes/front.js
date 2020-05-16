var express = require('express');
var router = express.Router();
router.get('/',function(req,res){
    if(req.session.loggedin ){
//        if(req.session.page_views){
//            
// let pageviews = "you vistit first time" + req.session.page_views++;
//        res.render('frontend/index.ejs', { pageviews:pageviews, });
//        }
//      else {
//          req.session.page_views = 1;
//          let pageviews = "you vistit first time" + req.session.page_views;
//         
//      }
         res.render('frontend/index.ejs', { pageviews:"Welcome to our app  id=" +req.session.userId+";", });
    }
  
    else{
        res.redirect('/login');
        
    }
});
router.get('/get-payment',function(req,res){
    
    
    if(req.session.loggedin){
         let add_by = req.session.userId;
        let Uersget = "select * from add_customer where add_by='"+add_by+"'  order by id DESC";
        
        db.query(Uersget,(err,result)=>{
            
            
           res.render('frontend/payment/get-payment.ejs',{
               
               getlist:result,
               
           })
            
        })
    }
     else{
         
         res.redirect('/');
     }
});

    router.get('/logout',function(req,res){
         if(req.session){
             req.session.destroy(function(err){
                 if(err){

                     return res.status(500).send(err);
                 }
                 else{
                    res.redirect('/login'); 

                 }
             })
         }

    });


router.get('/index',function(req,res){
    
  res.render('frontend/index.ejs', { title: 'Express' });
});
router.get('/add-user',function(req,res){
    
  res.render('frontend/payment/add-user.ejs', { MsgPrint:'',MsgPrint2:'', });
    
    
    
});



router.post('/add-user',function(req,res){
    if(req.session.loggedin){
            let customername= req.body.customername;
        let customerphone= req.body.customerphone;
        let customeremail= req.body.customeremail;
        let add_by = req.session.userId;
  let insercustomer = "insert into add_customer (customer_name,customer_phone,customer_email,add_by) Values ('"+customername+
                    "','"+customerphone+"','"+customeremail+"','"+add_by+"')"
                
                
                db.query(insercustomer,(err,result)=>{
                      if(err){
                return res.status(500).send(err);
            }
                   else{
                       
                       res.redirect('/get-payment');
                   }
                    });
    }
    
    
//    if(req.session.loggedin){
//         let errprint = '';
//        
//        let customername= req.body.customername;
//        let customerphone= req.body.customerphone;
//        let customeremail= req.body.customeremail;
//        
//        
//        let selectCustomer = "select * from add_customer where customer_phone='"+customerphone+"' "
//        
//        db.query(selectCustomer,(err,result)=>{
//            if(err){
//                return res.status(500).send(err);
//            }
//            
//            
//            if(result.length > 0 ){
//                
//                let MsgPrint ="Number already in Use";
//                let MsgPrint2 ="Email already in Use";
//                
//                res.render('frontend/payment/add-user.ejs',{
//                   
//                    MsgPrint:MsgPrint,
//                    MsgPrint2:MsgPrint2,
//                })
//            }
//            else{
//                
//                let insercustomer = "insert into add_customer (customer_name,customer_phone,customer_email,customer_date) Values ('"+customername+
//                    "','"+customerphone+"','"+customeremail+"',NOW())"
//                
//                
//                db.query(insercustomer,(err,result)=>{
//                      if(err){
//                return res.status(500).send(err);
//            }
//                   else{
//                       
//                       res.redirect('/get-payment');
//                   }
//                    });
//            }
//                })
//            }
        })
 
router.get('/profile',function(req,res){
    
  res.render('frontend/profile.ejs', { title: 'Express' });
});router.get('/edit-profile',function(req,res){
    
  res.render('frontend/edit-profile.ejs', { title: 'Express' });
});
router.get('/register',function(req,res){
            let phonemessage= '';
            let emailmessage= '';
         res.render('frontend/register.ejs', { title: 'Express',phonemessage:'',emailmessage:'' });
           });
router.get('/login',function(req,res){
            let phonemessage= '';
            let emailmessage= '';
         res.render('frontend/login.ejs', { title: 'Express',phonemessage:'',emailmessage:'',email:'',password:'' });
           })






router.post('/login',function(req,res){
        
   
    let emailid= req.body.emailid;
    let password = req.body.password;
    
    let loginquery = "select * from user_login where email='"+emailid+"' or phone='"+emailid+"' ";
    db.query(loginquery,(err,result)=>{
        
           if(err){
//               return res.status(500).send(err);
               console.log(err);
            }
            
         else{  if(result.length > 0 ){
            if(result[0].password==password){
                req.session.loggedin = true;
				req.session.emailid = emailid;
                req.session.userId = result[0].id;
                res.redirect('/')
            }
          else{
               let phonemessage= 'Your Password Worng';
           
              
              res.render('frontend/login.ejs',{
                  phonemessage:phonemessage,
                   email:emailid,
                  password:password
                  
              })
              
          }
                 
            }
              else{
                   
                   let phonemessage= 'phone or email not Register';
           
              
              res.render('frontend/login.ejs',{
                  phonemessage:phonemessage,
                  email:emailid,
                  password:password
                  
              })
                   
              }
            
        }
        res.end();
    })
    
});
router.post('/register',function(req,res){

    
    let name = req.body.name;
//    let image = req.files.image;
    let address = req.body.address;
    let busness = req.body.busness;
    let phoneNO = req.body.phoneno;
    let emailId = req.body.emailid;
    let password = req.body.password;
    let language = req.body.language;
     
    let checkphone = "select * from user_login where phone = '"+phoneNO+"' ";
    
    db.query(checkphone,(err,result)=>{
             
          let checkemail = "select * from user_login where email = '"+emailId+"' ";
    
        db.query(checkemail,(err,result)=>{ 
        
            if(result.length > 0){
                
                phonemessage='Number Already Register';
                emailmessage='Email Already Register';
            res.render('frontend/register.ejs',{
                
                phonemessage:phonemessage,
                emailmessage:emailmessage
             
            });
            }
                       else{
                       
                       let inQuery = "insert into user_login (email,phone,language,password) values ('"+emailId+"','"+phoneNO+"','"+language+"','"+password+"')"
                       
                       
                       db.query(inQuery,(err,result)=>{
                
                
                 if(err){
                return res.status(500).send(err);
            }
            
                
              res.redirect('/');
                
            });
                       }
        
        
        
        
 });       
 });
});
router.get('*',function(req,res){
           
res.redirect('/')           })
module.exports = router;
