var configconnect = require('../config/db');
const {check, validationResult} = require('express-validator');

var fs = require('fs');
const sharp = require('sharp')
const path = require('path')



exports.messageCon =  function(req,res){
    
      let userId = req.session.userId;
        db.query("select * from   message  where user_id = '"+userId+"'",(err,resultmsg)=>{

     res.render('frontend/user/message.ejs',{ 
                 resultmsg2:resultmsg,
                 req:req,
                 
                 })
        })
}
exports.dashboard =  function(req,res){
    
    
     let userid = req.session.userId;
    let Newsselect = "select * from news where postBy = '"+userid+"'";
    let businessS = "select business.*,m.image_path from business_ads as business left join media as m on m.id=(select min(nm.id) from media as nm where nm.post_id=business.id) where business.userid = '"+userid+"' order by id DESC";
    let Productsid = "select * from designs where userid='"+userid+"'";
    let pricingchk = "select * from pricing where userid='"+userid+"'";
   
      
    db.query(businessS,(err,Getbusesult)=>{
        if(Getbusesult.length > 0){
        var mediaid = Getbusesult[0].id;
        }
         let bussinessMedia = "select * from media where post_id ='"+mediaid+"'";
    
        
    db.query(Newsselect,(err,Getuserarticle)=>{
    db.query(bussinessMedia,(err,bussinessMedia)=>{
      
    db.query(Productsid,(err,GetuserProduct)=>{
    db.query(pricingchk,(err,pricingchkR)=>{
        
         console.log(Getuserarticle),
        res.render('frontend/user/index.ejs',{
            
           Getbusesult:Getbusesult,
           pricingchkR:pricingchkR,
            bussinessMedia:bussinessMedia,  
           Getuserarticle : Getuserarticle,
           GetuserProduct:GetuserProduct,
            req:req,
            
        })
        })
        })
        
    })  
        
    })   
    })
 
    
    
    
}
exports.Getarticle = function(req,res){
     
  getuserArticle(req,res,'',[])
    
}
exports.Detelearticle = function(req,res){
    
    let userId =req.session.userId;
    let articleid = req.params.id;
    let urlredirect = req.params.urlredirect;
    
    let MediaPath = "select news_image from news where id = '"+articleid+"'";
    let ArticleD = "delete  from news where id = '"+articleid+"'";
    
    db.query(MediaPath,(err,MediaPathresult)=>{
        
        let mediapath = MediaPathresult[0].news_image;
        
        fs.unlink(`public/user/${mediapath}`,(err)=>{
            
            db.query(ArticleD,(err,ArticleDR)=>{
                res.redirect('/user/article');
                
            })
            
            
        })
        
        
        
    })
    
}
exports.articleEdit = function(req,res){ 
    
    let articleId =req.params.id;
    let userId = req.session.userId;
    let selecteEdit= " select * from news where id = '"+articleId+"'  and postBy = '"+userId+"'";
    let selectcategory = "select * from category where parent_category is null order by category_name";
    db.query(selecteEdit,(err,articleIdreult)=>{
    db.query(selectcategory,(err,articleResult)=>{
        
        res.render('frontend/user/edit-article.ejs',{
            
            dataR:articleIdreult,
            message:'',
            errors:[],
            articleResult:articleResult,
            req:req,

        })
        })
    })
    
    
    

}
exports.Updatetarticle = function(req,res){
      
    
     imageresizer (req,res);
 const errors = validationResult(req);
                            var featureimage = req.files['ads_logo']?req.files['ads_logo'][0]:'';
                            var title1 = req.body.title1;
                            var title2 = req.body.title2;
                            var replacesting = title1.replace(/\s/g," ");
                            var news_image = req.body.news_image;   
                            var publisher_image = req.body.publisher_image;   
                            var keyword = req.body.keyword;
                       var author = req.body.author?req.body.author:req.session.name;
                            var author_image = req.files['author_image']?req.files['author_image'][0]:'';
                          
                          var description = req.body.description;
                            
    
    
                            var category = req.body.category;
                          
                            var language = req.body.language;
                             var userid = req.session.userId;
                             var PostId = req.params.id;
                             var authormagemain = author_image.filename?author_image.filename:publisher_image;
                        var featureImage2 = featureimage.filename?featureimage.filename:news_image;
    
    
  if (errors.isEmpty()) {

                            
                            
                           
      
         let QueryArticle = "update news set news_title='"+replacesting+"',news_subtitle='"+title2+"',news_des='"+description+"',news_image='"+featureImage2+"',news_category='"+category+"',user='"+author+"',author_image='"+authormagemain+"',Keyword='"+keyword+"',language='"+language+"',postBy='"+userid+"' where id='"+PostId+"' ";           

    
  db.query(QueryArticle,(err,result)=>{
    
      
        console.log(featureImage2);
res.redirect('/user/article');
            
            


      
      
      
  }) 


  }
    else{
        
   
        
           let articleId =req.params.id;
    let userId = req.session.userId;
    let selecteEdit= " select * from news where id = '"+articleId+"'";
    let selectcategory = "select * from category where parent_category is null order by category_name";
    db.query(selecteEdit,(err,articleIdreult)=>{
    db.query(selectcategory,(err,articleResult)=>{
        
        res.render('frontend/user/edit-article.ejs',{
            
            dataR:articleIdreult,
            message:'',
            errors:errors.errors,
            articleResult:articleResult,
            req:req,

        })
        })
    })
    
    }
        
   
}
exports.getArticles = function(req,res){
    
    let userid = req.session.userId;
    let addyby = req.params.id;
    
    let Getuserarticle = "select * from news where postBy = '"+userid+"'";
    
    db.query(Getuserarticle,(err,Getuserarticle)=>{
        
        res.render('frontend/user/article.ejs',{
            Getuserarticle:Getuserarticle,
            req:req,
        })
        
    })
    
}
exports.GetEvents = function(req,res){ res.render('frontend/user/events.ejs')}

function getuserArticle(req,res,message,errors,title1){
  
      let Articlequery = "select * from category where parent_category is null order by category_name";
    
    
    db.query(Articlequery,(err,articleResult)=>{
        
            let Countrylequery = "select * from countries";
db.query(Countrylequery,(err,CountryResult)=>{ 


     let Newsquery = "select * from news"; 
db.query(Newsquery,(err,NewsResult)=>{  
    
    if(err){
        
        return res.status(500).send(err);
    }
 res.render('frontend/user/post-article.ejs',{
     
     articleResult:articleResult,
     CountryResult:CountryResult,
     NewsResult:NewsResult,
     message :message,
     errors:errors,
     req:req,
     title1:title1,
 })
    
});

});
        
        
    })
}
exports.Subcategory = function(req,res){
     let category = req.params.parent_category;
    let queryas = "select distinct category_name from category where parent_category = '"+category+"'";
    db.query(queryas,(err,resultsub)=>{
        
       let Catevalue = "<option value=''>Select</option>"
        
       
       resultsub.forEach((resultsub)=>{
           
        Catevalue += "<option value='"+resultsub.category_name+"' > "+resultsub.category_name+"  </option> "
           
       })
        res.json({'subcategory':Catevalue})
        
    })
    
    
}
exports.BSubcategory = function(req,res){
     let category = req.params.parent_category;
    let queryas = "select distinct category_name from directoryc where parent_category = '"+category+"'";
    db.query(queryas,(err,resultsub)=>{
        
       let Catevalue = "<option value=''>Select</option>"
        
       
       resultsub.forEach((resultsub)=>{
           
        Catevalue += "<option value='"+resultsub.category_name+"' > "+resultsub.category_name+"  </option> "
           
       })
        res.json({Catevalue})
        
    })
    
    
}


exports.Getcityajax = function(req,res){
    
    let getcities = "select city from cities";
        db.query(getcities,(err,getcitiesR)=>{
           let Catevalue = "";
            getcitiesR.forEach((getcitiesR1)=>{
                
                Catevalue += '"'+getcitiesR1.city+'",';
            })
            res.json({Catevalue})
        });

}
exports.CSubcategory = function(req,res){
     let category = req.params.parent_category;
    let queryas = "select distinct category_name from directoryc where parent_category = '"+category+"'";
    db.query(queryas,(err,resultsub)=>{
        
       let Catevalue = "";
        
       
       resultsub.forEach((resultsub)=>{
           
        Catevalue += "<label class='serviceBox'><input type='checkbox' name='service[]' value='"+resultsub.category_name+"' > "+resultsub.category_name+"</label>"
           
       })
        res.json({Catevalue})
        
    })
    
    
}
function imageresizer (req,res){
     req.file = req.files['ads_logo']?req.files['ads_logo'][0]:'';
    if(req.file){
    sharp(req.file.path)
    .resize(300,200)
    .jpeg({quality: 100})
    .toFile(
        path.resolve(`public/user/resize/${req.files['ads_logo'][0].filename}`)
    )
//    fs.unlinkSync(req.file.path);

        
    }
    
}
exports.Postarticle = function(req,res){
      
    imageresizer (req,res);
    
    
 const errors = validationResult(req);

    
  if (errors.isEmpty()) {

                            
                            
                            var  featureimage = req.files['ads_logo']?req.files['ads_logo'][0]:'';
                            var title1 = req.body.title1;
                            var title2 = req.body.title2;
                            var replacesting = title1.replace(/\s/g," ");
                            var keyword = req.body.keyword;
                            var author = req.body.author?req.body.author:req.session.name;
                            var author_image = req.files['author_image']?req.files['author_image'][0]:'';
                          
                          
                            var category = req.body.category;
                            var description = req.body.description;
                            
                            var language = req.body.language;
                             var userid = req.session.userId;
                             var authormagemain = author_image.filename?author_image.filename:'0';
      
      
        let selecT = "select * from news where news_title = '"+ title1 +"'";
    
         db.query(selecT,(err,selecTr)=>{ 
             
             if(selecTr.length > 0){
                 
               getuserArticle(req,res,'This Title  already found',errors.errors)      

             }
         else{
                   
let QueryArticle = "insert into news (news_title,news_subtitle,news_des,news_image,news_category,user,author_image,Keyword,language,postBy) values ('"+replacesting+"','"+title2+"','"+description+"','"+featureimage.filename+"','"+category+"','"+author
+"','"+authormagemain+"','"+keyword+"','"+language+"','"+userid+"')";
    
  db.query(QueryArticle,(err,result)=>{
    
      
        
res.redirect('/user/article');
            

      
      
  }) 
         }
         });


  }
    else{
        
        getuserArticle(req,res,'',errors.errors)
 
    }
        
   
}
exports.Homeloginget = function(req,res){
    
    SignInerror(req,res,'',[],'','','')
}
function SignInerror(req,res,registerMsg,errors,user_email,user_password,wrong_password){
     res.render('frontend/login.ejs',{
        req:req, 
        registerMsg:registerMsg,
         errors:errors,
         user_email:user_email,
         user_password:user_password,
         wrong_password:wrong_password,
     }); 
    
}
exports.Homesignup = function(req,res){
    SignUperror(req,res,'',[],'','');
    
}
function SignUperror(req,res,registerMsg,errors,user_name,user_email){
     res.render('frontend/register.ejs',{
        req:req, 
        registerMsg:registerMsg,
         errors:errors,
         user_name:user_name,
         user_email:user_email,
     }); 
    
}
exports.HomeLoginpost = function(req,res){ 
    var errors = validationResult(req); 
    let user_email = req.body.user_email;
    let user_password = req.body.user_password;
    
     var Queryregister = req.query.business;
    if(errors.isEmpty()) {
    let Checkuser = "select * from user_login where  email = '"+user_email+"' ";
    
   
    
    db.query(Checkuser,(err,GetLogin)=>{
        
        console.log(Checkuser);
        if(GetLogin.length > 0){
              req.session.loggedin = true;
            req.session.user_mobile = GetLogin[0].phone;
				
                req.session.userId = GetLogin[0].id;
                req.session.email = GetLogin[0].email;
            req.session.Username = GetLogin[0].name;
            req.session.name = GetLogin[0].name;
            req.session.profilepic = GetLogin[0].image;
            
            
          
            
            if(GetLogin[0].password == user_password ){
                var userid = req.session.userId;
              
                if(Queryregister=="register"){ 
                res.redirect('/for-business')
                }
                else if(Queryregister=="post"){
                    
                    res.redirect('/user/post-article') 
                } else if(Queryregister=="product"){
                    
                    res.redirect('/product/listing') 
                }
                else {
                    
                    res.redirect('/user/dashboard') 
                }
                
            }
           
            else{
                
                SignInerror(req,res,'',[],user_email,'','invalid password');
            }
            
        }
        else{
                           SignInerror(req,res,'',[],user_email,'','invalid password');

        }
    })
    }
    else{
          SignInerror(req,res,'',errors.errors,user_email,user_password,'');
    }

} 
exports.NewpostRegister2 = function(req,res){ 
     var errors = validationResult(req);
     var user_name = req.body.user_name;
    var user_mobile = req.body.user_mobile;
    var user_email = req.body.user_email;
    var user_password = req.body.user_password;
        
   var Queryregister = req.query.business;
    if(errors.isEmpty()) {
        
   
      
        
    let Checkuser = "select * from user_login where  email = '"+user_email+"'";
    db.query(Checkuser,(err,resultRegister)=>{
         if(err){

    return res.status(500).send(err);
  }

        if(resultRegister.length>0){
          
      
            if(resultRegister[0].email == user_email  ){


                SignUperror(req,res,'Email already register.',[],'','');


            }
     
        }   
        else {
            
            let Inseruser = "insert into user_login (name,email,password) values ('"+user_name+"','"+user_email+"','"+user_password+"')";
            
            db.query(Inseruser,(err,resultInsert)=>{
                 if(err){

    return res.status(500).send(err);
  }

             
     res.redirect('/user/dashboard') 
  
            
        })
        }
    })
    

}
else{
    
                 SignUperror(req,res,'Email already register.',errors.errors,user_name,user_email);

}
}

exports.NewpostRegister = function(req,res){ 
     var errors = validationResult(req);
     var user_name = req.body.user_name;
    var user_mobile = req.body.user_mobile;
    var user_email = req.body.user_email;
    var user_password = req.body.user_password;
        
   var Queryregister = req.query.business;
    if(errors.isEmpty()) {
        
   
      
        
    let Checkuser = "select * from user_login where  email = '"+user_email+"'";
    db.query(Checkuser,(err,resultRegister)=>{
         if(err){

    return res.status(500).send(err);
  }

        if(resultRegister.length>0){
          
      
            if(resultRegister[0].email == user_email  ){


                SignUperror(req,res,'Email already register.',[],'','');


            }
     
        }   
        else {
            
            let Inseruser = "insert into user_login (name,email,password) values ('"+user_name+"','"+user_email+"','"+user_password+"')";
            
            db.query(Inseruser,(err,resultInsert)=>{
                 if(err){

    return res.status(500).send(err);
  }

             var getlastid =  resultInsert.insertId;

                console.log(resultInsert)
                let Checkuser = "select * from user_login where  id = '"+getlastid+"'";
    
   
    
    db.query(Checkuser,(err,GetLogin)=>{
         if(err){

    return res.status(500).send(err);
  }

        
        if(GetLogin.length > 0){
              req.session.loggedin = true;
			 	req.session.user_mobile = GetLogin[0].phone;
                req.session.userId = GetLogin[0].id;
                req.session.email = GetLogin[0].email;
            req.session.Username = GetLogin[0].name;
            req.session.name = GetLogin[0].name;
            req.session.profilepic = GetLogin[0].image;
            
         
              if(Queryregister=="register"){ 
                res.redirect('/for-business')
                } 
             else if(Queryregister=="post"){
                    
                    res.redirect('/user/post-article') 
                }
            
               
          
            else {
                    
                    res.redirect('/user/dashboard') 
                }
        }
             
            })
            
        })
        }
    })
    

}
else{
    
                 SignUperror(req,res,'Email already register.',errors.errors,user_name,user_email);

}
}

exports.coverphoto = function(req,res){
    
    var errors = validationResult(req);
      let user_profile = req.files['user_profile']?req.files['user_profile'][0]:'';
      
    if(req.files['user_profile'] !== undefined){
        let userid = req.session.userId;
      let Username = req.session.Username;
      
    
        
        
                let user_profilephoto = "select * from business_ads where userid = '"+userid+"'";
    
      db.query(user_profilephoto,(err,Userdata)=>{
          
           
    
                   
                   let deleteold = "DELETE coverphoto from coverphotobusiness_ads where userid = '"+userid+"'";
                   let image_profile  = Userdata[0].coverphoto;
                       
                   fs.unlink(`public/post/${image_profile}`,(err)=>{
                   db.query(deleteold,(err,deleteimage)=>{
                       
                      
					
					 let prodileUpdate = "update business_ads set coverphoto = '"+ user_profile.filename+ "' where userid = '"+userid+"'";
			   
			   db.query (prodileUpdate,(err,prodileUpdate)=>{
                   
                    var imagePath = Userdata[0].image;
                             res.json({Profile_result:"Photo Successful Updated",Profile_path:user_profile.filename});
                           
                           
                       })
                  
				   
				  
			   })
                    
                    
                    
                    
				})
                
        
        
            
        })
        
        
    }
	else{
		   res.json({errors:"This field is required"}); 
		
}
}
exports.chageProfile = function(req,res){
     imageresizer4 (req,res);
    var errors = validationResult(req);
    if(errors.isEmpty()){
        let userid = req.session.userId;
      let Username = req.session.Username;
        let user_profile = req.files['user_profile']?req.files['user_profile'][0]:'';
      
    
        
        
                let user_profilephoto = "select * from user_login where id = '"+userid+"'";
    
      db.query(user_profilephoto,(err,Userdata)=>{
          
           
    
                   
                   let deleteold = "DELETE image from user_login where id = '"+userid+"'";
                   let image_profile  = Userdata[0].image;
                       
                   fs.unlink(`public/user/${image_profile}`,(err)=>{
                   db.query(deleteold,(err,deleteimage)=>{
                       
                      
					
					 let prodileUpdate = "update user_login set image = '"+ user_profile.filename+ "' where id = '"+userid+"'";
			   
			   db.query (prodileUpdate,(err,prodileUpdate)=>{
                   
                    var imagePath = Userdata[0].image;
                             res.json({Profile_result:"Photo Successful Updated",Profile_path:user_profile.filename});
                           
                           
                       })
                  
				   
				  
			   })
                    
                    
                    
                    
				})
                
        
        
            
        })
        
        
    }
	else{
		   res.json(errors) 
		
}
}
exports.chagePssword = function(req,res){
    
  
    var errors = validationResult(req);
    
    if(errors.isEmpty()) {
    let current_password = req.body.current_password;
    let new_password = req.body.new_password;
    let userid = req.session.userId;
let chagepassword = "select * from user_login where id = '"+userid+"'";
    
    
    db.query(chagepassword,(err,changeresult)=>{
        
     
        if(changeresult[0].password ==  current_password ){
            
          
            let updatepassword = "update user_login set password = '"+new_password+"' where id = '"+userid+"'";
            
            db.query(updatepassword,(err,chagesucess)=>{
                
               res.json({chagep_msg:'Change Password Successfull '})  
            })
            
            
        }
        
        else{
           res.json({errchagep_msg:"password Not Match"});  
            
        }
    })
    
    
    }
    
    else{
        
        res.json(errors)
    }
    
    
}
exports.PostLogin = function(req,res){ 

    let user_mobile = req.body.user_mobile;
    let user_password = req.body.user_password;
    let Checkuser = "select * from user_login where  email = '"+user_mobile+"' or phone = '"+user_mobile+"' ";
    
   
    
    db.query(Checkuser,(err,GetLogin)=>{
        
        console.log(Checkuser);
        if(GetLogin.length > 0){
              req.session.loggedin = true;
				req.session.user_mobile = GetLogin[0].phone;
                req.session.userId = GetLogin[0].id;
                req.session.email = GetLogin[0].email;
            req.session.Username = GetLogin[0].name;
            req.session.name = GetLogin[0].name;
            req.session.profilepic = GetLogin[0].image;
            
            
          
            
            if(GetLogin[0].password == user_password ){
                var userid = req.session.userId;
                res.json({message:'Login Sucess',userid:userid},);
                
            }
           
            else{
                res.json({errmessage:'password Wrong'});
            }
            
        }
        else{
           res.json({wrongdetails:'Email not register'});
        }
    })

} 
exports.postRegister = function(req,res){
  
    var errors = validationResult(req);
    
    if(errors.isEmpty()) {
        
    var user_name = req.body.user_name;
    var user_mobile = req.body.user_mobile;
    var user_email = req.body.user_email;
    var user_password = req.body.user_password;
        
   
        
        
    let Checkuser = "select * from user_login where  email = '"+user_email+"'";
    db.query(Checkuser,(err,resultRegister)=>{
        if(resultRegister.length>0){
          
      
            if(resultRegister[0].email == user_email  ){


                res.json({message:'Email already Register',

                         })


            }
         
        }   
        else {
            
            let Inseruser = "insert into user_login (name,email,phone,password) values ('"+user_name+"','"+user_email+"','"+user_password+"')";
            
            db.query(Inseruser,(err,resultInsert)=>{
                
                
               
 res.json({message2:'Register Sucessful'})
            })
            
        }
        
    })
    

}
else{
    
    res.send(errors);
}


}
function imageresizer4 (req,res){
 req.file = req.files['user_profile']?req.files['user_profile'][0]:'';    if(req.file){
    sharp(req.file.path)
    .resize(250,250)
    .jpeg({quality: 100})
    .toFile(
        path.resolve(`public/user/profile/${req.files['user_profile'][0].filename}`)
    )
//    fs.unlinkSync(req.file.path);

        
    }
    
}
exports.postProfile = function(req,res){
    let errors = validationResult(req);
    
        
                            var username = req.body.username;
                            var profiletitle = req.body.profiletitle;
                            var aboutme = req.body.aboutme;
                            var website = req.body.website;
                            var emailid = req.body.emailid;
                            var mobileno = req.body.mobileno;
                            var gender = req.body. gender;
                            var dob = req.body.dob;
                            var location = req.body.location;
                            var facebook = req.body.facebook;
                            var instagram = req.body.instagram;
                            var linkedin = req.body.linkedin;
                            var twitter = req.body.twitter;
                              var user_id = req.session.userId;
                     
    
    if(errors.isEmpty()){
   let userprofile = "UPDATE `user_login` SET `name`='"+username+"',`email`='"+emailid+"',`phone`='"+mobileno+
                 "',`aboutme`='"+aboutme+"',`profile_title`='"+profiletitle+"',`gender`='"+gender+
                 "',`website`='"+website+"',`dob`='"+dob+"',`location`='"+location+"',`facebook`='"+facebook+"',`instagram`='"+instagram+
                 "',`linkedin`='"+linkedin+"',`twitter`='"+twitter+"' WHERE id='"+user_id+"'";
    
    
            
             
       
             
             db.query(userprofile,(err,Userinsert)=>{
                 
                 res.redirect('/user/profile');
             })
             
       
          
          
                
    
    
    }

    
    else {
        
       var user_id = req.session.userId;
     let Userprofiles = "select * from user_login where id = '"+user_id+"'";
   
      db.query(Userprofiles,(err,Userdata)=>{
          console.log(Userdata);
          if(err){
              
              return res.status(200).send(err);
          }
     
          res.render('frontend/user/edit.ejs',{
            Userdata:Userdata,
          
             req:req,
              errors:errors,
            
        }) 
          
      });  
        
    }
    
   
         
    
        
    
    
                            
}
exports.editGetProfile = function(req,res){
     var user_id = req.session.userId;
     let Userprofiles = "select * from user_login where id = '"+user_id+"'";
   
      db.query(Userprofiles,(err,Userdata)=>{
          console.log(Userdata);
          if(err){
              
              return res.status(200).send(err);
          }
     
          res.render('frontend/user/edit.ejs',{
            Userdata:Userdata,
          
             req:req,
            
        }) 
          
      });
        
       
    
   
}
exports.GetProfile = function(req,res){
     var user_id = req.session.userId;
     let Userprofiles = "select * from user_login where id = '"+user_id+"'";
   
      db.query(Userprofiles,(err,Userdata)=>{
          console.log(Userdata);
          if(err){
              
              return res.status(200).send(err);
          }
     
          res.render('frontend/user/profile.ejs',{
            Userdata:Userdata,
          
               req:req,
            
        }) 
          
      });
        
       
    
   
}
exports.Mediaupload = function(req,res){
    
let image_path = req.files['mediafile']?req.files['mediafile'][0]:'';
 
    
      var mediafilepath = '"http://localhost:3000/post/' + image_path.filename + '"';
             

                res.json({'filepathname':mediafilepath});
}
exports.Mediadelete = function(req,res){
    
 let id = req.params.id;
    let selecteMedia = "select image_path from media where id = '"+id+"'";
    
    let DeletMedia = "delete  from  media where id = '"+id+"'";
    db.query(selecteMedia,(err,selecteMedia)=>{
        
        
          let image_path =   selecteMedia[0].image_path;
            fs.unlink(`public/user/${image_path}`,(err)=>{
                db.query(DeletMedia,(err,DeletMedia)=>{ 
                
                             
            res.json("Media Deleted")
                    
            });
            
    });
    });
    
}
exports.productEdit = function(req,res){
    
    
        productedit(req,res,'',[],'');
    

                              
    
    
}

exports.GetProduct = function(req,res){
    
    
         getforproduct2(req,res,'',[],'','','','','','','','','','','','')
   

                              
    
    
}

function productedit(req,res,message,errors,imgempty){
      let postId = req.params.id;
 
  
    let country_name = req.params.country_name;
    let parent_category = req.params.parent_category;
    let Selectdata_s= "select * from designs where id = '"+postId+"'";
    let mediaslect = "select * from media where post_id = '"+postId+"'";
  
    
    
     
      let countryads = "select distinct state from cities  order by state ASC";
    
        db.query(countryads,(err,countryads)=>{ 
        db.query(Selectdata_s,(err,Selectdata_r)=>{ 
        db.query(mediaslect,(err,mediaslect)=>{ 
   
           
            res.render('frontend/user/edit-product.ejs',{
               
                
                countryads:countryads,
                message:message,
                Selectdata_r:Selectdata_r,
            errors:errors,imgempty:imgempty,
                req:req,res:res,
                mediaslect:mediaslect,
                 
          
            })   })
            
        });
        
    });
        
}
function getProduct_ads(req,res,message,errors,imgempty){
    
    let country_name = req.params.country_name;
    let parent_category = req.params.parent_category;
    let categories_s= "select * from category where parent_category is null order by category_name  ";
    
    db.query(categories_s,(err,categories_s)=>{
     
        let countryads = "select * from  countries where name ='india' or name = 'united states'  order by name ASC";
    
        db.query(countryads,(err,countryads)=>{ 
   
           
            res.render('frontend/user/post-product.ejs',{
               
                categories_s:categories_s,
             
                countryads:countryads,
                message:message,
            errors:errors,imgempty:imgempty,
                req:req,res:res
                 
            })
            
        });
        
    });
       
    
    
    
    
}  
exports.ProductgetPost = function(req,res){
    
  let userid = req.session.userId;
    let addyby = req.params.id;
    
    let GetuserProduct = "select * from designs where userid = '"+userid+"'";
    
    db.query(GetuserProduct,(err,GetuserProduct)=>{
        
        res.render('frontend/user/designs.ejs',{
            GetuserProduct:GetuserProduct,
            req:req,
        })
        
    })
    
    
}
exports.Deteleproduct2 = function(req,res){
    
    
       let userId = req.session.userId;
   	let productId = req.params.id;

    let Seletebusmedia = "select image_path from media where post_id = '"+productId+"'";
    let Deletebussiness = "delete  from designs where id = '"+productId+"'";
    let Deletebusmedia = "delete from media where post_id = '"+productId+"'";
    db.query(Seletebusmedia,(err,Seletebusmedia)=>{
        if(Seletebusmedia[0]) {
         let image_path = Seletebusmedia[0].image_path;
         
        fs.unlink(`public/post/${image_path}`,(err)=> { 
    
           })   
        }
        db.query(Deletebussiness,(err,Deletebussiness)=>{ 
     db.query(Deletebusmedia,(err,Deletebusmedia)=>{   
         
          res.redirect('/user/designs')
        });});
      
    })
    
   
    
}
exports.productnewPost = function(req,res){
                                              var errors = validationResult(req);
                               let category = req.body.category;
                               let ads_type = req.body.ads_type;
                           
                               let companyname = req.body.companyname;
                               let currency_id = req.body.currency_id;
                             
                               let yearproject = req.body.yearproject;
                               let ads_title = req.body.ads_title;
                               let ads_logo = req.files['ads_logo']?req.files['ads_logo'][0]:'';
                               let ads_media = req.files['ads_media']?req.files['ads_media']:'';
    
                               let ads_description = req.body.ads_description;
                               let ads_updatelogo = req.body.ads_updatelogo;
                              
                               let ads_contact = req.body.ads_contact;
                               let ads_state = req.body.ads_state;
                               let ads_city = req.body.ads_city;
                               let ads_email = req.body.ads_email;
                               let ads_mobile = req.body.ads_mobile;
                               let ads_price = req.body.ads_price;
                               let ads_website = req.body.ads_website;
                             
                           var gettitle= ads_title.replace(/'/g,"");
                                var getdes= ads_description.replace(/'/g,"");
                                let ads_feature = ads_logo.filename?ads_logo.filename:ads_updatelogo;
  
                                if (errors.isEmpty() &&	req.files['ads_media'] !== undefined ){
      
                                     let userId = req.session.userId;
                                     
                                
                                   let userbussinessw = "select * from designs where shopname = '"+companyname+"'";
    
                                 db.query(userbussinessw,(err,res_adstitle)=>{
                       
                                     if(res_adstitle.length > 0){
                                          getforproduct2(req,res,'Company name already found',errors,category,companyname,ads_title,ads_description,ads_feature,ads_state,ads_city,ads_contact,ads_website,ads_price,yearproject,'')
                                         
                                     }
                                     else{
                                         
                                        
                                        let inserproduct =   "INSERT INTO `designs`( `ads_category`,`ads_title`, `ads_des`, `ads_logo`, `ads_city`,`ads_state`, `ads_contactname`, `ads_email`, `ads_mobile`, `ads_price`, `product_currency`, `ads_website`, `shopname`, `brandname`, `userid`) VALUES ('"+category+"','"+gettitle+"','"+getdes+"','"+ads_feature+"','"+ads_city+ "','"+ads_state+ "','"+ads_contact+ "','"+ads_email+"','"+ads_mobile+"','"+ads_price+ "','"+currency_id+"','"+ads_website+"','"+companyname+"','"+yearproject+"','"+userId+ "')";
                                         
                                         
                                                
                                              
                                                
                                                db.query(inserproduct,(err,resultinsert)=>{
                                                 
                                                 var getlastid =  resultinsert.insertId;
                                                     if(ads_media){
                                                    for(i=0; i < ads_media.length; i++){
                                                    
                                                       let mediainsert = "insert into media (image_path, add_by,post_id) values ('"+ads_media[i].filename+
                                                           "','"+userId +"','"+ getlastid+"')";
                                                        
                                                        db.query(mediainsert,(err,mediainsert)=>{
                                                            
                                                            
                                                        })
                                                         
                                                    }
                                                     }
                                                       res.redirect('/user/dashboard')
                                                })
                                     
                                     }
                                     
                                 })
    
    }
    else{
        
     
        getforproduct2(req,res,'',errors.errors,category,companyname,ads_title,ads_description,ads_feature,ads_state,ads_city,ads_contact,ads_website,ads_price,yearproject,'','Select altest 1 image')
    }
                     
    
    
}
exports.productnewupdate = function(req,res){
    
    
    
     var errors = validationResult(req);
       let category = req.body.category;
                               let ads_type = req.body.ads_type;
                           
                               let companyname = req.body.companyname;
                               let currency_id = req.body.currency_id;
                             
                               let yearproject = req.body.yearproject;
                               let ads_title = req.body.ads_title;
                               let ads_logo = req.files['ads_logo']?req.files['ads_logo'][0]:'';
                               let ads_media = req.files['ads_media']?req.files['ads_media']:'';
    
                               let ads_description = req.body.ads_description;
                              
                               let ads_contact = req.body.ads_contact;
                               let ads_state = req.body.ads_state;
                               let ads_city = req.body.ads_city;
                               let ads_email = req.body.ads_email;
                               let ads_mobile = req.body.ads_mobile;
                               let ads_price = req.body.ads_price;
                               let ads_website = req.body.ads_website;
                             
                                var gettitle= ads_title.replace(/'/g,"");
                                var getdes= ads_description.replace(/'/g,"");
                                let ads_updatelogo = req.body.ads_updatelogo;
                              
                                
                               let updatefimage1 = req.body.updatefimage;
                                   let updatefimagename = ads_logo.filename?ads_logo.filename:updatefimage1;

                              
                              
                                
    if (errors.isEmpty()){
                                 
                              
                               let id = req.params.id;
                               
                                    let userId = req.session.userId;
                                   
                                 
                                      
                                         
                                     
                                     let Inserbusiness =  "UPDATE `designs` SET `ads_category`='"+category+"',`ads_title`='"+gettitle+"',`ads_des`='"+getdes+"',`ads_logo`='"+updatefimagename+"',`ads_city`='"+ads_city+"',`ads_state`='"+ads_state+"',`ads_contactname`='"+ads_contact+ "',`ads_email`='"+ads_email+"',`ads_mobile`='"+ads_mobile+"',`ads_price`='"+ads_price+ "',`product_currency`='"+currency_id+"',`ads_website`='"+ads_website+"',`shopname`='"+companyname+"',`brandname`='"+yearproject+"' where id ='"+id+"'";
                                     
                                  
                                       
                                         
                                                       
                                                
                                                db.query(Inserbusiness,(err,resultinsert)=>{
                                                 
                                                    
                                                    console.log(resultinsert);
                                                 var getlastid =  resultinsert.insertId;
                                                    
                                                    if(ads_media){
                                                    for(i=0; i < ads_media.length; i++){
                                                    
                                                       let mediainsert = "insert into media (image_path, add_by,post_id) values ('"+ads_media[i].filename+
                                                           "','"+userId +"','"+ id+"')";
                                                        
                                                        db.query(mediainsert,(err,mediainsert)=>{
                                                            
                                                            
                                                        })
                                                         
                                                    }
                                                    }
                                                     res.redirect('/user/designs');
                                                    
                                                })
                                     
                                
    
    
    }
    
    else{
        
           productedit(req,res,'',errors.errors,'');
    }
                                    
    
    
}
function imageresizer2 (req,res){
     req.file = req.files['ads_logo']?req.files['ads_logo'][0]:'';
    if(req.file){
    sharp(req.file.path)
    .resize(300,200)
    .jpeg({quality: 100})
    .toFile(
        path.resolve(`public/user/resize/${req.files['ads_logo'][0].filename}`)
    )
//    fs.unlinkSync(req.file.path);

        
    }
    
}
function imageresizer3 (req,res){
     req.file = req.files['ads_logo']?req.files['ads_logo'][0]:'';
    if(req.file){
    sharp(req.file.path)
    .resize(300,200)
    .jpeg({quality: 100})
    .toFile(
        path.resolve(`public/user/product/${req.files['ads_logo'][0].filename}`)
    )
//    fs.unlinkSync(req.file.path);

        
    }
    
}



//for Pricing 
exports.PricingbusinessPost = function(req,res){
                                              var errors = validationResult(req);
                               let category = req.body.category;
                              
                           
                               let companyname = req.body.companyname;
                               let ads_updatelogo = req.body.ads_updatelogo;
                             
                                let offer = req.body.offer;
                               let ads_logo = req.files['ads_logo']?req.files['ads_logo'][0]:'';
                               let pincode = req.body.pincode;
                               let ads_state = req.body.ads_state;
                               let ads_city = req.body.ads_city;
                               let sqft = req.body.sqft;
                               let perday = req.body.perday;
                               let hourly = req.body.hourly;
                               let service = req.body.service;
                              let ads_feature = ads_logo.filename?ads_logo.filename:ads_updatelogo;
                              let NullChk = perday+sqft+hourly;
                           var gettitle= companyname.replace(/'/g,"");
  
                                  if (errors.isEmpty() &&  NullChk !=''){
      
                                     let userId = req.session.userId;
                                    
                                
                                   let userbussinessw = "select * from pricing where company = '"+companyname+"' and userid !='"+userId+"'";
                                   let usercategory = "select * from pricing where ads_category = '"+category+"' and userid ='"+userId+"'";
    
                                 db.query(userbussinessw,(err,res_companyname)=>{
                                 db.query(usercategory,(err,usercategoryr)=>{
                       
                                     if(res_companyname.length > 0){
                                          getforpricing(req,res,'Company name already taken',[],category,companyname,pincode,ads_logo,ads_state,ads_city,offer,sqft,perday,hourly,'')
                                         
                                     }else if (usercategoryr.length > 0){ 
                                         getforpricing(req,res,'',[],category,companyname,pincode,ads_logo,ads_state,ads_city,offer,sqft,perday,hourly,'','Category already found. you add 1 pricing for 1 category')
                                     }
                                     else{
                                         
                                        
                                        let inserproduct =   "INSERT INTO `pricing`( `ads_category`,`services`, `company`, `ads_logo`, `ads_state`,`ads_city`, `hourly`, `sqft`, `perday`, `offer`, `pincode`,`userid`) VALUES ('"+category+"','"+service+"','"+gettitle+"','"+ads_feature+"','"+ads_state+ "','"+ads_city+ "','"+hourly+ "','"+sqft+"','"+perday+"','"+offer+ "','"+pincode+"','"+userId+ "')";
                                         
                                         
                                                
                                              
                                                
                                                db.query(inserproduct,(err,resultinsert)=>{
                                                 
                                             
                                                       res.redirect('/user/dashboard')
                                                })
                                     
                                     }
                                     
                                 })
                                 })
    
    }
   
    else{
        
      let mmsgchks= NullChk?'':'Please select one charges out of 3';
        getforpricing(req,res,'',errors.errors,category,companyname,pincode,ads_logo,ads_state,ads_city,offer,sqft,perday,hourly,mmsgchks,'')
    }
                     
    
    
}
function getforpricing(req,res,message,errors,category,companyname,pincode,ads_logo,ads_state,ads_city,offer,sqft,perday,hourly,imgempty,Categoychk){
    
    let country_name = req.params.country_name;
    let parent_category = req.params.parent_category;
    
          let countryads = "select distinct state from cities  order by state ASC";
    
        db.query(countryads,(err,countryads)=>{ 
   
           
            res.render('frontend/user/post-pricing.ejs',{
               
               
                category:category,
               countryads:countryads,
                companyname:companyname,
                pincode:pincode,
                offer:offer,
                ads_logo:ads_logo,
             errors:errors,
                ads_state:ads_state,
                ads_city:ads_city,
                offer:offer,
                sqft:sqft,
                perday:perday,
                hourly:hourly,
                
                message:message,
            Categoychk:Categoychk,
                imgempty:imgempty,
                req:req,
                res:res,
                 
         
            
        });
        
    });

    
}  
exports.Pricingbusiness = function(req,res){
    
      
  let userid = req.session.userId;
    let addyby = req.params.id;
    
    let GetuserProduct = "select * from pricing where userid = '"+userid+"'";
    
    db.query(GetuserProduct,(err,GetuserProduct)=>{
        
        res.render('frontend/user/pricing.ejs',{
            GetuserProduct:GetuserProduct,
            req:req,
        })
        
    })
     
    
}
exports.PricingForm = function(req,res){
    
    
         getforpricing(req,res,'',[],'','','','','','','','','','','','')
   

                              
    
    
}
exports.getupdatepricing = function(req,res){
    
                               var errors = validationResult(req);
                               let category = req.body.category;
                              
                        
                               let companyname = req.body.companyname;
                             var getId = req.params.id;
                                let offer = req.body.offer;
                                let updatefimage = req.body.updatefimage;
                               let ads_logo = req.files['ads_logo']?req.files['ads_logo'][0]:'';
                              let updateLogo = ads_logo.filename?ads_logo.filename:updatefimage;
                               let pincode = req.body.pincode;
                               let ads_state = req.body.ads_state;
                               let ads_city = req.body.ads_city;
                               let sqft = req.body.sqft;
                               let perday = req.body.perday;
                               let hourly = req.body.hourly;
                               let service = req.body.service;
                               let NullChk = perday+sqft+hourly;
                              let userId = req.session.userId;
                           var gettitle= companyname.replace(/'/g,"");
  
                                  if (errors.isEmpty() && NullChk !=''){
                                        let userbussinessw = "select * from pricing where company = '"+companyname+"' and userid !='"+userId+"' ";
                                   let usercategory = "select * from pricing where ads_category = '"+category+"' and userid ='"+userId+"' and id !='"+getId+"' ";
    
                                 db.query(userbussinessw,(err,res_companyname)=>{
                                 db.query(usercategory,(err,usercategoryr)=>{
                       
                                     if(res_companyname.length > 0){
                                          getforpricing2(req,res,'',[],'','Company name already taken','')
                                         
                                     }else if (usercategoryr.length > 0){ 
                                         getforpricing2(req,res,'',[],'','','Category already found. you add 1 pricing for 1 category')
                                     }
                                     else{
                                         
                                  var updatePricing =   "update  pricing set ads_category='"+category+"',services='"+service+"',company='"+gettitle+"',ads_logo='"+updateLogo+"',ads_state='"+ads_state+"',ads_city='"+ads_city+"',hourly='"+hourly+"',sqft='"+sqft+"',perday='"+perday+"',offer='"+offer+"',pincode='"+pincode+"'  where id ='"+getId+"'";
                                  
                                 
                                         db.query(updatePricing,(err,updatePricing)=>{
                                                         res.redirect('/user/pricing');    
                                                          
                                                        })
                                                         
                                                  }
                                                 })})
                                      
                                      
                                  }
    else{
        let mmsgchks= NullChk?'':'Please select one charges out of 3';
          getforpricing2(req,res,'',errors.errors,mmsgchks,'','');
    }
    
             }
exports.getEditpricing = function(req,res){
    
    
    getforpricing2(req,res,'',[],'','','')
   
             }


exports.deletepricing = function(req,res){
   
    
       let userId = req.session.userId;
   	let pricingId = req.params.id;


    let Deletebussiness = "delete  from pricing where id = '"+pricingId+"'";
 
        
        db.query(Deletebussiness,(err,Deletebussiness)=>{ 
     
         if(Deletebussiness[0]) {
         let image_path = Deletebussiness[0].ads_logo;
         
        fs.unlink(`public/post/${image_path}`,(err)=> { 
    
           })   
        }
          res.redirect('/user/pricing')
        });
      
    
}
function getforpricing2(req,res,message,errors,imgempty,companychk,Categoychk){
    var getId = req.params.id;
     db.query("select * from pricing where id= '"+getId+"'",(err,resultpricing)=>{
    db.query("select distinct state from cities  order by state ASC",(err,countryads)=>{
        
        res.render('frontend/user/edit-pricing.ejs',{
            countryads:countryads,
            res:res,
            req:req,companychk:companychk,
            resultpricing:resultpricing,
               errors:errors,Categoychk:Categoychk,
            message:message,
            imgempty :imgempty,
        })
    })
    
})
}
//for Business ads

exports.adgetPost = function(req,res){
    
 getBussiness_ads(req,res,'',[],'','','','','','','','','','','','','','','','','','');
  
    
}
exports.Editbusiness = function(req,res){
 
      edituserbusiness(req,res,'',[],'');                        
    
    
}
function edituserbusiness(req,res,message,errors,imgempty){
       
    
    let postId = req.params.id;
 
  
    let country_name = req.params.country_name;
    let parent_category = req.params.parent_category;
    let categories_s= "select * from directoryc where parent_category is null order by category_name  ";
    let Selectdata_s= "select * from business_ads where id = '"+postId+"'";
    let mediaslect = "select * from media where post_id = '"+postId+"'";
  
    
    db.query(categories_s,(err,categories_s)=>{
     
            let countryads = "select distinct state from cities  order by state ASC";
    
        db.query(countryads,(err,countryads)=>{ 
        db.query(Selectdata_s,(err,Selectdata_r)=>{ 
        db.query(mediaslect,(err,mediaslect)=>{ 
         
            res.render('frontend/user/adsedit.ejs',{

                categories_s:categories_s,
            
                countryads:countryads,
                message:message,
                Selectdata_r:Selectdata_r,
            errors:errors,imgempty:imgempty,
                req:req,res:res,
                mediaslect:mediaslect,
                 
            })
           
            })   })
            
        });
        
    });
}
exports.updateBusiness = function(req,res){
   
    
     var errors = validationResult(req);
   
    
    if (errors.isEmpty()){
                                  let category = req.body.category;
                               let service = req.body.service;
                               let ads_type = req.body.ads_type;
                              
                               let shopname = req.body.shopname;
                               let id = req.params.id;
                               let currency_id = req.body.currency_id;
                               let offer = req.body.offer;
                               let brandename = req.body.brandename;
                               let ads_title = req.body.ads_title;
                               let ads_logo = req.files['ads_logo']?req.files['ads_logo'][0]:'';
                               let ads_media = req.files['ads_media']?req.files['ads_media']:'';
    
                               let ads_description = req.body.ads_description;
                               let ads_updatelogo = req.body.ads_updatelogo;
                               let ads_country = req.body.ads_country;
                               let ads_address = req.body.ads_address;
                               let ads_contact = req.body.ads_contact;
                               let ads_state = req.body.ads_state;
                               let ads_city = req.body.ads_city;let ads_pincode = req.body.pincode;
                               let ads_email = req.body.ads_email;
                               let ads_mobile = req.body.ads_mobile;
                               let ads_price = req.body.ads_price;
                               let ads_website = req.body.ads_website;
                               let updatefimage = req.body.updatefimage;
                               let ads_facebook = req.body.facebook;
                               let ads_instagram = req.body.instagram;
                               let ads_linkedin = req.body.linkedin;
                               let ads_twitter = req.body.twitter;
                               let userId = req.session.userId;
                                let updatefimagename = ads_logo.filename?ads_logo.filename:updatefimage;
                                 var gettitle= ads_title.replace(/'/g,"");
                                var getdes= ads_description.replace(/'/g,"");
                                
                                           
                                       let inserbusiness =   "update  `business_ads` set `ads_category`='"+category+"', `ads_subcategory`='"+service+ "', `ads_title`='"+gettitle+"', `ads_des`='"+getdes+"', `ads_logo`='"+updatefimagename+"', `ads_address`='"+ads_address+ "', `ads_country`='"+ads_country+ "', `ads_state`='"+ads_state+ "', `ads_city`='"+ads_city+ "',`ads_contactname`='"+ads_contact+ "',`ads_email`='"+ads_email+"', `ads_mobile`='"+ads_mobile+"', `ads_price`='"+ads_price+ "', `ads_website`='"+ads_website+"', `pincode`='"+ads_pincode+"',`ads_facebook`='"+ads_facebook+"', `ads_instagram`='"+ads_instagram+"', `ads_twitter`='"+ads_twitter+ "', `ads_linkedin`='"+ads_linkedin+"' where id = '"+id+"'";
                                           
                                                db.query(inserbusiness,(err,resultinsert)=>{
                                                 
                                                 if(ads_media){
                                                    for(i=0; i < ads_media.length; i++){
                                                    
                                                       let mediainsert = "insert into media (image_path, add_by,post_id) values ('"+ads_media[i].filename+
                                                           "','"+userId +"','"+ id+"')";
                                                        
                                                        db.query(mediainsert,(err,mediainsert)=>{
                                                            
                                                          
                                                        })
                                                         
                                                    }
                                                }
                                                  res.redirect('/user/business');
                                                    
                                                })
                                     
                                    
                                     
                                 
    
    
    }
    
    else{
        
        edituserbusiness(req,res,'',errors.errors,'');
    }
                                    
    
    
}
exports.Getbusiness = function(req,res){
   
    
     let userid = req.session.userId;
    let businessS = "select business.*,m.image_path from business_ads as business left join media as m on m.id=(select min(nm.id) from media as nm where nm.post_id=business.id) where business.userid = '"+userid+"' order by id DESC";
   
   
      
    db.query(businessS,(err,Getbusesult)=>{
        if(Getbusesult.length > 0){
        var mediaid = Getbusesult[0].id;
        }
        else{
           var mediaid = 0;  
        }
        let Reviews = "select * from reviews  where userid='"+userid+"' and businessId='"+mediaid+"'";
         let bussinessMedia = "select * from media where post_id ='"+mediaid+"'";
    
        
    db.query(Reviews,(err,ReviewsR)=>{
    db.query(bussinessMedia,(err,bussinessMedia)=>{
      
  
        res.render('frontend/user/ads.ejs',{
            
           Getbusesult:Getbusesult,
         
            bussinessMedia:bussinessMedia,  
           ReviewsR:ReviewsR,
        
            req:req,
       
        })
        
    })  
        
    })   
    })
 
    
}

exports.Deletebusiness = function(req,res){
   
    
       let userId = req.session.userId;
   	let bussniessId = req.params.id;

    let Seletebusmedia = "select image_path from media where add_by = '"+userId+"'";
    let Deletebussiness = "delete  from business_ads where id = '"+bussniessId+"'";
    let Deletebusmedia = "delete from media where add_by = '"+bussniessId+"'";
    db.query(Seletebusmedia,(err,Seletebusmedia)=>{
        if(Seletebusmedia[0]) {
         let image_path = Seletebusmedia[0].image_path;
         
        fs.unlink(`public/post/${image_path}`,(err)=> { 
    
           })   
        }
        db.query(Deletebussiness,(err,Deletebussiness)=>{ 
     db.query(Deletebusmedia,(err,Deletebusmedia)=>{   
         
          res.redirect('/user/business')
        });});
      
    })
}
function getforBussiness(req,res,message,errors,subcategory,category,ads_title,ads_description,ads_feature,ads_address,ads_country,ads_state,ads_city,ads_contact,ads_website,ads_pincode,ads_price,ads_facebook,ads_instagram,ads_twitter,ads_linkedin,ads_mobile,imgempty,imageSlt){
    
    let country_name = req.params.country_name;
    let userId = req.session.userId;
    let parent_category = req.params.parent_category;
    let businesschk_s= "select * from business_ads where userid='"+userId+"'";
    let categories_s= "select * from directoryc where parent_category is null order by category_name ";
    
    db.query(businesschk_s,(err,businesschk_sr)=>{
        
        if(businesschk_sr.length > 0) { res.redirect('/user/dashboard')}
        else{
    db.query(categories_s,(err,categories_s)=>{
     
            let countryads = "select distinct state from cities  order by state ASC";
    

        db.query(countryads,(err,countryads)=>{ 
   
           
            res.render('frontend/forbusiness.ejs',{
               ads_mobile:ads_mobile,
                categories_s:categories_s,
                category:category,
                subcategory:subcategory,
                ads_title:ads_title,
                ads_description:ads_description,
                ads_logo:ads_feature,
                imageSlt:imageSlt,
                ads_address:ads_address,
                ads_country:ads_country,
                ads_state:ads_state,
                ads_city:ads_city,
                ads_pincode:ads_pincode,
                ads_contact:ads_contact,
                ads_website:ads_website,
                ads_price:ads_price,
                ads_facebook:ads_facebook,
                ads_instagram:ads_instagram,
                ads_twitter:ads_twitter,
                ads_linkedin:ads_linkedin,
                countryads:countryads,
                message:message,
            
                errors:errors,
                imgempty:imgempty,
                req:req,
                res:res,
                 
            })
            })
            
        });
        }
        
    });

    
}  


function getBussiness_ads(req,res,message,errors,service,category,ads_title,ads_description,ads_feature,ads_address,ads_country,ads_state,ads_city,ads_contact,ads_website,ads_price,ads_facebook,ads_instagram,ads_twitter,ads_linkedin,imgempty,imageSlt){
    
    let country_name = req.params.country_name;
    let parent_category = req.params.parent_category;
    let categories_s= "select * from directoryc where parent_category is null order by category_name  ";
    
    db.query(categories_s,(err,categories_s)=>{
      let countryads = "select distinct state from cities  order by state ASC";
    
        db.query(countryads,(err,countryads)=>{ 
   
           
            res.render('frontend/user/post-ads.ejs',{
               
                categories_s:categories_s,
                category:category,
                service:service,
                imageSlt:imageSlt,
                ads_title:ads_title,
                ads_description:ads_description,
                ads_logo:ads_feature,
                ads_address:ads_address,
                ads_country:ads_country,
                ads_state:ads_state,
                ads_city:ads_city,
                ads_contact:ads_contact,
                ads_website:ads_website,
                ads_price:ads_price,
                ads_facebook:ads_facebook,
                ads_instagram:ads_instagram,
                ads_twitter:ads_twitter,
                ads_linkedin:ads_linkedin,
                countryads:countryads,
                message:message,
            
                errors:errors,
                imgempty:imgempty,
                req:req,
                res:res,
                 
            })
            
        });
        
    });

    
}  



exports.Getcities = function(req,res){
    
    
    let stateName = req.params.stateId;
    
    let SateQury = "select distinct city from cities where state = '"+stateName+"' order by city ";
             
  
       db.query(SateQury,(err,getcity)=>{
       
         var get_city ="<option>Select</option>";
           getcity.forEach((getitems)=>{
               
             get_city += '<option value="'+getitems.city+'" >'+getitems.city+'</option>';
               
           })
       res.json({get_city});
       })
                
                
                
    
}
exports.Getcitiesall = function(req,res){
    
    
    let stateName = req.params.stateId;
    
    let SateQury = "select * from city  where cityName = '"+stateName+"' ";
             
  
       db.query(SateQury,(err,getcity)=>{
       
         var get_city ="<option>Select</option>";
           getcity.forEach((getitems)=>{
               
             get_city += '<option value="'+getitems.name+'" data-id="'+getitems.id+'">'+getitems.name+'</option>';
               
           })
       res.json({get_city});
       })
                
                
                
    
}

exports.adnewPostB = function(req,res){
  
                            var errors = validationResult(req);
                               let category = req.body.category;
                               let service = req.body.service;
                               let ads_type = req.body.ads_type;
                           
                               let shopname = req.body.shopname;
                               let currency_id = req.body.currency_id;
                               let offer = req.body.offer;
                               let brandename = req.body.brandename;
                               let ads_title = req.body.ads_title;
                               let ads_logo = req.files['ads_logo']?req.files['ads_logo'][0]:'';
                               let ads_media = req.files['ads_media']?req.files['ads_media']:'';
    
                               let ads_description = req.body.ads_description;
                               let ads_updatelogo = req.body.ads_updatelogo;
                               let ads_country = req.body.ads_country;
                               let ads_address = req.body.ads_address;
                               let ads_contact = req.body.ads_contact;
                               let ads_state = req.body.ads_state;
                               let ads_city = req.body.ads_city;
                               let ads_email = req.body.ads_email;
                               let ads_mobile = req.body.ads_mobile;
                               let ads_price = req.body.ads_price;
                               let ads_website = req.body.ads_website;
                               let ads_pincode = req.body.pincode;
                               let ads_facebook = req.body.facebook;
                               let ads_instagram = req.body.instagram;
                               let ads_linkedin = req.body.linkedin;
                               let ads_twitter = req.body.twitter;
                                let ads_feature = ads_logo.filename?ads_logo.filename:ads_updatelogo;
                                 var gettitle= ads_title.replace(/'/g,"");
                                var getdes= ads_description.replace(/'/g,"");
                                if (errors.isEmpty() &&	req.files['ads_media'] !== undefined){
      
                                     let userId = req.session.userId;
                                     
                                
                                   let userbussinessw = "select * from business_ads where ads_title = '"+gettitle+"'";
    
                                 db.query(userbussinessw,(err,res_adstitle)=>{
                       
                                     if(res_adstitle.length > 0){
                                          getforBussiness(req,res,'This tilte already found',errors.errors,service,category,ads_title,ads_description,ads_feature,ads_address,ads_country,ads_state,ads_city,ads_contact,ads_website,ads_price,brandename,offer,ads_pincode,ads_twitter,ads_linkedin,ads_mobile,'','')
                                         
                                     }
                                     else{
                                         
                                        
                                           
                                       let inserbusiness =   "INSERT INTO `business_ads`(`ads_category`, `ads_subcategory`, `ads_title`, `ads_des`, `ads_logo`, `ads_address`, `ads_country`, `ads_state`, `ads_city`, `ads_contactname`, `ads_email`, `ads_mobile`, `ads_price`, `ads_website`,`pincode`, `ads_facebook`, `ads_instagram`, `ads_twitter`, `ads_linkedin`, `userid`) VALUES ('"+category+"','"+service+ "','"+gettitle+"','"+getdes+"','"+ads_feature+"','"+ads_address+ "','"+ads_country+ "','"+ads_state+ "','"+ads_city+ "','"+ads_contact+ "','"+ads_email+"','"+ads_mobile+"','"+ads_price+ "','"+ads_website+"','"+ads_pincode+"','"+ads_facebook+"','"+ads_instagram+"','"+ads_twitter+ "','"+ads_linkedin+"','"+userId+"')";
                                                
                                              
                                                
                                                db.query(inserbusiness,(err,resultinsert)=>{
                                                 
                                                 var getlastid =  resultinsert.insertId;
                                                    
                                          
                                                    
                                                     if(ads_media){
                                                    for(i=0; i < ads_media.length; i++){
                                                    
                                                       let mediainsert = "insert into media (image_path, add_by,post_id) values ('"+ads_media[i].filename+
                                                           "','"+userId +"','"+ getlastid+"')";
                                                        
                                                        db.query(mediainsert,(err,mediainsert)=>{
                                                            
                                                            
                                                        })
                                                         
                                                    }
                                                     }
                                                       res.redirect('/user/dashboard')
                                                })
                                     
                                     }
                                     
                                 })
    
    }
    else{
        
     
        getforBussiness(req,res,'',errors.errors,service,category,ads_title,ads_description,ads_feature,ads_address,ads_country,ads_state,ads_city,ads_contact,ads_website,ads_price,brandename,offer,ads_pincode,ads_twitter,ads_linkedin,ads_mobile,'','Select altest 1 image')
    }
                                    
    
    
}
exports.adnewbusiness = function(req,res){
  
                             var errors = validationResult(req);
                               let category = req.body.category;
                               let subcategory = req.body.subcategory;
                               let ads_type = req.body.ads_type;
                           
                               let shopname = req.body.shopname;
                               let currency_id = req.body.currency_id;
                               let offer = req.body.offer;
                               let brandename = req.body.brandename;
                               let ads_title = req.body.ads_title;
                               let ads_logo = req.files['ads_logo']?req.files['ads_logo'][0]:'';
                               let ads_media = req.files['ads_media']?req.files['ads_media']:'';
    
                               let ads_description = req.body.ads_description;
                               let ads_updatelogo = req.body.ads_updatelogo;
                               let ads_country = req.body.ads_country;
                               let ads_address = req.body.ads_address;
                               let ads_contact = req.body.ads_contact;
                               let ads_state = req.body.ads_state;
                               let ads_city = req.body.ads_city;
                               let ads_email = req.body.ads_email;
                               let ads_mobile = req.body.ads_mobile;
                               let ads_price = req.body.ads_price;
                               let ads_website = req.body.ads_website;
                               let ads_facebook = req.body.facebook;
                               let ads_instagram = req.body.instagram;
                               let ads_linkedin = req.body.linkedin;
                               let ads_twitter = req.body.twitter;
         var gettitle= ads_title.replace(/[^a-zA-Z ]/g,"");
                                var getdes= ads_description.replace(/[^a-zA-Z ]/g,"");
                                let ads_feature = ads_logo.filename?ads_logo.filename:ads_updatelogo;
                                if (errors.isEmpty()){
      
                                     let userId = req.session.userId;
                                     
                                
                                   let userbussinessw = "select * from business_ads where ads_title = '"+gettitle+"'";
    
                                 db.query(userbussinessw,(err,res_adstitle)=>{
                       
                                     if(res_adstitle.length > 0){
                                          getforBussiness(req,res,'This tilte already found',errors.errors,subcategory,category,ads_title,ads_description,ads_feature,ads_address,ads_country,ads_state,ads_city,ads_contact,ads_website,ads_price,ads_facebook,ads_instagram,ads_twitter,ads_linkedin,'')
                                         
                                     }
                                     else{
                                         
                                        
                                           
                                       let inserbusiness =   "INSERT INTO `business_ads`(`ads_category`, `ads_subcategory`, `ads_title`, `ads_des`, `ads_logo`, `ads_address`, `ads_country`, `ads_state`, `ads_city`, `ads_contactname`, `ads_email`, `ads_mobile`, `ads_price`, `ads_website`, `ads_facebook`, `ads_instagram`, `ads_twitter`, `ads_linkedin`) VALUES ('"+category+"','"+subcategory+ "','"+gettitle+"','"+getdes+"','"+ads_feature+"','"+ads_address+ "','"+ads_country+ "','"+ads_state+ "','"+ads_city+ "','"+ads_contact+ "','"+ads_email+"','"+ads_mobile+"','"+ads_price+ "','"+ads_website+"','"+ads_facebook+"','"+ads_instagram+"','"+ads_twitter+ "','"+ads_linkedin+"')";
                                                
                                              
                                                
                                                db.query(inserbusiness,(err,resultinsert)=>{
                                                 
                                                 var getlastid =  resultinsert.insertId;
                                                     if(ads_media){
                                                    for(i=0; i < ads_media.length; i++){
                                                    
                                                       let mediainsert = "insert into media (image_path, add_by,post_id) values ('"+ads_media[i].filename+
                                                           "','"+userId +"','"+ getlastid+"')";
                                                        
                                                        db.query(mediainsert,(err,mediainsert)=>{
                                                            
                                                            
                                                        })
                                                         
                                                    }
                                                     }
                                                       res.redirect('/user/dashboard')
                                                })
                                     
                                     }
                                     
                                 })
    
    }
    else{
        
     
        getforBussiness(req,res,'',errors.errors,subcategory,category,ads_title,ads_description,ads_feature,ads_address,ads_country,ads_state,ads_city,ads_contact,ads_website,ads_price,ads_facebook,ads_instagram,ads_twitter,ads_linkedin,'')
    }
                                    
    
    
}

exports.forBusiness = function(req,res){
    
   getforBussiness(req,res,'',[],'','','','','','','','','','','','','','','','','');
   
    
}
exports.forProduct = function(req,res){
    
   getforproduct(req,res,'',[],'','','','','','','','','','','','','','','','','','');
   
    
}
function getforproduct(req,res,message,errors,subcategory,category,shopname,ads_title,ads_description,ads_feature,ads_address,ads_country,ads_state,ads_city,ads_contact,ads_website,ads_price,brandename,offer,ads_twitter,ads_linkedin,imgempty){
    
    let country_name = req.params.country_name;
    let parent_category = req.params.parent_category;
    let categories_s= "select * from directoryc where parent_category is null order by category_name  ";
    
    db.query(categories_s,(err,categories_s)=>{
     
     
           let countryads = "select * from  countries where name ='india' or name = 'united states'  order by name ASC";
    
        db.query(countryads,(err,countryads)=>{ 
   
           
            res.render('frontend/forproduct.ejs',{
               
                categories_s:categories_s,
                category:category,
                subcategory:subcategory,
                shopname:shopname,
                ads_title:ads_title,
              
                ads_description:ads_description,
                ads_logo:ads_feature,
                ads_address:ads_address,
                ads_country:ads_country,
                ads_state:ads_state,
                ads_city:ads_city,
                ads_contact:ads_contact,
                ads_website:ads_website,
                ads_price:ads_price,
                brandename:brandename,
                offer:offer,
                ads_twitter:ads_twitter,
                ads_linkedin:ads_linkedin,
                countryads:countryads,
                message:message,
            
                errors:errors,
                imgempty:imgempty,
                req:req,
                res:res,
                 
            })
            
        });
        
    });

    
}  
function getforproduct2(req,res,message,errors,category,companyname,ads_title,ads_description,ads_feature,ads_state,ads_city,ads_contact,ads_website,ads_price,yearproject,imgempty,imageSlt){
    
    let country_name = req.params.country_name;
    let parent_category = req.params.parent_category;
    
          let countryads = "select distinct state from cities  order by state ASC";
    
        db.query(countryads,(err,countryads)=>{ 
   
           
            res.render('frontend/user/post-product.ejs',{
               
               
                category:category,
               
                companyname:companyname,
                ads_title:ads_title,
                ads_description:ads_description,
                ads_logo:ads_feature,
               imageSlt:imageSlt,
                ads_state:ads_state,
                ads_city:ads_city,
                ads_contact:ads_contact,
                ads_website:ads_website,
                ads_price:ads_price,
                yearproject:yearproject,
                
                
                countryads:countryads,
                message:message,
            
                errors:errors,
                imgempty:imgempty,
                req:req,
                res:res,
                 
         
            
        });
        
    });

    
}  
exports.adnewPostP = function(req,res){
  
                              var errors = validationResult(req);
                               let category = req.body.category;
                               let subcategory = req.body.subcategory;
                               let ads_type = req.body.ads_type;
                           
                               let shopname = req.body.shopname;
                               let currency_id = req.body.currency_id;
                               let offer = req.body.offer;
                               let brandename = req.body.brandename;
                               let ads_title = req.body.ads_title;
                               let ads_logo = req.files['ads_logo']?req.files['ads_logo'][0]:'';
                               let ads_media = req.files['ads_media']?req.files['ads_media']:'';
    
                               let ads_description = req.body.ads_description;
                               let ads_updatelogo = req.body.ads_updatelogo;
                               let ads_country = req.body.ads_country;
                               let ads_address = req.body.ads_address;
                               let ads_contact = req.body.ads_contact;
                               let ads_state = req.body.ads_state;
                               let ads_city = req.body.ads_city;
                               let ads_email = req.body.ads_email;
                               let ads_mobile = req.body.ads_mobile;
                               let ads_price = req.body.ads_price;
                               let ads_website = req.body.ads_website;
                               let ads_facebook = req.body.facebook;
                               let ads_instagram = req.body.instagram;
                               let ads_linkedin = req.body.linkedin;
                               let ads_twitter = req.body.twitter;
                           var gettitle= ads_title.replace(/'/g,"");
                                var getdes= ads_description.replace(/'/g,"");
                                let ads_feature = ads_logo.filename?ads_logo.filename:ads_updatelogo;
                                if (errors.isEmpty()){
      
                                     let userId = req.session.userId;
                                     
                                
                                   let userbussinessw = "select * from products where shopname = '"+shopname+"'";
    
                                 db.query(userbussinessw,(err,res_adstitle)=>{
                       
                                     if(res_adstitle.length > 0){
                                          getforproduct(req,res,'Shop name already found',errors.errors,subcategory,category,shopname,ads_title,ads_description,ads_feature,ads_address,ads_country,ads_state,ads_city,ads_contact,ads_website,ads_price,ads_facebook,ads_instagram,ads_twitter,ads_linkedin,'')
                                         
                                     }
                                     else{
                                         
                                        
                                        let inserproduct =   "INSERT INTO `products`( `ads_category`, `ads_subcategory`, `ads_title`, `ads_des`, `ads_logo`, `ads_address`, `ads_country`, `ads_city`,`ads_state`, `ads_contactname`, `ads_email`, `ads_mobile`, `ads_price`, `product_currency`, `ads_website`, `offer`, `shopname`, `brandname`, `userid`) VALUES ('"+category+"','"+subcategory+ "','"+gettitle+"','"+getdes+"','"+ads_feature+"','"+ads_address+ "','"+ads_country+ "','"+ads_city+ "','"+ads_state+ "','"+ads_contact+ "','"+ads_email+"','"+ads_mobile+"','"+ads_price+ "','"+currency_id+"','"+ads_website+"','"+offer+"','"+shopname+"','"+brandename+"','"+userId+ "')";
                                         
                                         
                                                
                                              
                                                
                                                db.query(inserproduct,(err,resultinsert)=>{
                                                 
                                                 var getlastid =  resultinsert.insertId;
                                                     if(ads_media){
                                                    for(i=0; i < ads_media.length; i++){
                                                    
                                                       let mediainsert = "insert into media (image_path, add_by,post_id) values ('"+ads_media[i].filename+
                                                           "','"+userId +"','"+ getlastid+"')";
                                                        
                                                        db.query(mediainsert,(err,mediainsert)=>{
                                                            
                                                            
                                                        })
                                                         
                                                    }
                                                     }
                                                       res.redirect('/user/dashboard')
                                                })
                                     
                                     }
                                     
                                 })
    
    }
    else{
        
     
        getforproduct(req,res,'',errors.errors,subcategory,category,shopname,ads_title,ads_description,ads_feature,ads_address,ads_country,ads_state,ads_city,ads_contact,ads_website,ads_price,ads_facebook,ads_instagram,ads_twitter,ads_linkedin,'')
    }
                                    
    
    
}
