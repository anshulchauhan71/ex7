var util = require('util');
const {check, validationResult} = require('express-validator');
var nodemailer = require('nodemailer');


var configconnect = require('../config/db');


exports.Homepost = function(req,res){

     
    let latestnews = "select * from news where latest_news = '1' and homepage = '1' order by id DESC LIMIT 5";
    let bignews = "select * from news where big_news = '1' and homepage = '1' order by id DESC LIMIT 1";
    let topnews = "select * from news where top_news = '1' and homepage = '1'  order by id DESC LIMIT 2";
    let topnews2 = "select * from news where top_news = '1' and homepage = '1' order by id DESC LIMIT 5";
    let lifestyle = "select * from news where news_category = 'lifestyle' and homepage = '1' order by id DESC LIMIT 4";
    let health = "select * from news where news_category = 'health' or news_category = 'wellness'  and homepage = '1' order by id DESC LIMIT 4";
    let Designs = "select * from designs  order by id DESC LIMIT 10";
     let trevelfood = "select * from news where news_category = 'home' or news_category = 'outdoors'  and homepage = '1' order by id DESC LIMIT 4";
    
        let categoriesname = "select * from  directoryc  order by category_name  ASC";

    db.query(categoriesname,(err,categoriesname)=>{
    db.query(topnews,(err,topnewsr)=>{
    db.query(bignews,(err,bignews)=>{
    db.query(topnews2,(err,topnewsr2)=>{
    db.query(latestnews,(err,latestnews)=>{
    db.query(lifestyle,(err,lifestyler)=>{
    db.query(health,(err,health)=>{
    db.query(Designs,(err,Designsr)=>{
    db.query(trevelfood,(err,trevelfood)=>{
       res.render('frontend/index.ejs',{
           topnews:topnewsr,
           topnews2:topnewsr2,
           bignews:bignews,
           bignewsR:bignews,
           categoriesr:categoriesname,
           trevelfood:trevelfood,
           latestnews:latestnews,
           smallnewsi:latestnews,
           lifestyle:lifestyler,
           health:health,
           Designsitem:Designsr,
           req:req,
           
       }) 
       }) 
       }) 
       }) 
       }) 
       }) 
       }) 
       }) 
       }) 
    })
    
    
}

exports.DesignList = function(req,res){
 var searchresult = req.query.q;
          var Dcategory = req.params.Dcategory?req.params.Dcategory:searchresult;

    
    if(searchresult){
        console.log(searchresult)
    var Designs = "select * from designs where ads_category like '%"+searchresult+"%' or ads_title like  '%"+searchresult+"%'   order by id DESC LIMIT 10";
  }
    else{
            var Designs = "select * from designs  order by id DESC LIMIT 10";

    }
   
    db.query(Designs,(err,Designsr)=>{
      
       res.render('frontend/design-list.ejs',{
          
           Designsitem:Designsr,
           req:req,
           Dcategory:Dcategory
           
       }) 
       
       }) 
      
   
 
    
    
}




exports.designListfilter = function(req,res)
{
     var Dcategory = req.params.Dcategory;
  
     
   var replacesting = Dcategory.replace(/-/g," ");
//    var replacesting2 = replacesting.replace(/and/g,"&");
//    

  

  function capital_letter(str) 
{
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}
    
   var Dcategorylist = "select * from designs where ads_category='"+capital_letter(replacesting)+"'  order by id DESC";  
    
     
     db.query(Dcategorylist,(err,DcategorylistR)=>{
    
     res.render('frontend/design-list.ejs',{
        req:req, 
           Designsitem:DcategorylistR,
                    Dcategory:Dcategory

     }); 
    
   
         
    
     })
    
    
}

exports.UserDesign = function(req,res){

    
    
     var title = req.params.design_title;
     var id = req.params.id;
    
     var category = req.params.design_category ;
  
    let detailnews = "select * from designs where id = '"+id+"'";
   
    let readMore = "select * from designs order by id DESC LIMIT 8";
   
  
    
        db.query(detailnews,(err,detailnewsresult)=>{
            if(detailnewsresult.length>0){
            let idPost = detailnewsresult[0].id;
            let idAddby = detailnewsresult[0].userid;
            let relatedDesigns = "select * from designs where ads_category = '"+detailnewsresult[0].ads_category+"' and  id != '"+id+"'";
            console.log(relatedDesigns);
             let GalleySelect = "select * from media where post_id = '"+idPost+"' and add_by = '"+idAddby+"'";
        db.query(readMore,(err,readMore)=>{
        db.query(relatedDesigns,(err,relatedDesignsR)=>{
        db.query(GalleySelect,(err,GalleySelectR)=>{
       res.render('frontend/design-details.ejs',{
           detailresult:detailnewsresult,
         
           GalleySelectR:GalleySelectR,
           readMore:readMore,
           Designsitem:relatedDesignsR,
           req:req,
           
           
       }) 
       }) 
       }) 
  
    })
            }
            else{
                res.redirect('/404');
            }
    })
        
    
    
}

exports.DetailPage = function(req,res){

    
    
     var title = req.params.news_title;
     var id = req.params.id;
     var category = req.params.news_category ;
  
    let detailnews = "select * from news where id = '"+id+"' and news_category ='"+category+"'";
    let readMore = "select * from news order by id DESC LIMIT 8";
    let Relatednews = "select * from news where news_category ='"+category+"' order by id DESC LIMIT 1,4";
    
  
    
        db.query(detailnews,(err,detailnewsresult)=>{
        db.query(readMore,(err,readMore)=>{
        db.query(Relatednews,(err,Relatednews)=>{
       res.render('frontend/details.ejs',{
           detailresult:detailnewsresult,
           Relatednews:Relatednews,
           readMore:readMore,
           
           req:req,
           
           
       }) 
       }) 
  
    })
    })
    
    
}


exports.ProductDetails = function(req,res){
       var category = req.params.category;
       var id = req.params.id;
     let userId = req.session.userId;
     






    let bussinessDetails = "select * from business_ads where id ='"+id+"'";
    let ReviewsDetails = "select * from reviews where businessId ='"+id+"'";
    let bussinessMedia = "select * from media where post_id ='"+id+"'";
    
      
  
   
    
     db.query(bussinessDetails,(err,bussinessDetails)=>{
         var userIds =bussinessDetails[0].userid;
         let bussinessProject = "select * from designs where userid ='"+userIds+"'";
     db.query(ReviewsDetails,(err,ReviewsR)=>{
     db.query(bussinessMedia,(err,bussinessMedia)=>{
     db.query(bussinessProject,(err,ProjectR)=>{
          res.render('frontend/product-detail.ejs',{
        req:req,  
        bussinessDetails:bussinessDetails,  
        bussinessMedia:bussinessMedia,  
        ReviewsR:ReviewsR,  
       ProjectR:ProjectR,
       category:category
   
          })
          })
          })
          })
        
          })
}




exports.PostList = function(req,res){
     
       var querysrch = req.query.q;
   

  var category = req.params.category?req.params.category:req.query.q;


   if(querysrch){
       
         var listingNews = "select * from news where news_category like '%"+querysrch+"%' order by id DESC";
      
        
   }
    else{
      var listingNews = "select * from news where news_category = '"+category+"' order by id DESC";   
    }

    let latestnews = "select * from news where latest_news = '1' and news_category !='"+category+"' order by id DESC LIMIT 8";
    
  
   
   
     db.query(listingNews,(err,listingNewsre)=>{
          console.log(listingNewsre)
     db.query(latestnews,(err,latestnews)=>{
          res.render('frontend/articlelisting.ejs',{
        req:req,  
        listingNews:listingNewsre,  
        latestnews:latestnews,  
       category:category
   
          })
          })
          })
}


function articlesEndpoints(req,res) {
    
     let listingcat = "select * from category where parent_category is null order by category_name";
    
     db.query(listingcat,(err,listingcat)=>{
         
          var getCatList= "";
        
        listingcat.forEach((resultsub)=>{
            
            getCatList += resultsub.category_name+','
            
        });
         
   
      res.json([getCatList])
     
     });
        
  
 
} 


exports.Searchbox = function(req,res){
 
         res.render('frontend/search.ejs',{
        req:req,  
        
        
    
})
}
   
exports.Userprofile = function(req,res){
 
       var id = req.params.id;
  
   
      let authorStory = "select * from news where postBy='"+id+"' order by id DESC";
      let authorDetails = "select * from user_login where id='"+id+"'";
   let topnews = "select * from news where top_news = '1' order by id DESC LIMIT 6"; 
  
   
    
     db.query(topnews,(err,topnews)=>{
     db.query(authorStory,(err,authorStory)=>{
     db.query(authorDetails,(err,authorDetails)=>{
          res.render('frontend/profiles.ejs',{
        req:req,  
        authorStory:authorStory,  
        topnews:topnews,  
        authorDetails:authorDetails,  
        
    })
    })
          })
          })
}

exports.Reviews = function(req,res){
    
           var id = req.params.id;

    db.query("select * from business_ads where id ='"+id+"'",function(err,DataResult){
               res.render('frontend/review.ejs',{
             
               DataResult:DataResult,
                   req:req,

           });
             })
    
     
}
exports.ReviewsPost = function(req,res){
       
    var errors = validationResult(req);
    

        
            if(errors.isEmpty()) {
    
           var id = req.params.id;
          var ratingNo = req.body.rating3;
          var reviewname = req.body.reviewName;
          var reviewm = req.body.review;
          var userId = req.body.userId;
          var userId = req.session.userId;
                
         var  checkReviews = "select * from reviews where businessId = '"+id+"' and  userid = '"+userId+"'";
                db.query("select * from business_ads where id ='"+id+"'",function(err,DataResult){
                   
             db.query(checkReviews,(err,checkReviewsR)=>{
               var ViewTile =  DataResult[0].ads_title;
        var replacesting = ViewTile.replace(/\s/g,"-");
                 if(checkReviewsR.length  > 0) {
                               res.json({CheckStatus:'You’ve already reviewed',SiteUrl:'/directory/'+id+'/'+replacesting+''});

                 }
                 else { 
    
    db.query("insert into reviews (ratingNo,reviewname,review,businessId,userid) value ('"+ratingNo+"','"+reviewname+"','"+reviewm.replace(/'/g,"")+"','"+id+"','"+userId+"') ",function(err,DataResultIn){
               
         
        if(err){
            
            return res.status(500).send(err);
        }
        var ViewTile =  DataResult[0].ads_title;
        var replacesting = ViewTile.replace(/\s/g,"-");
     
          res.json({success:'Review successful Submit',SiteUrl:'/directory/'+id+'/'+replacesting+''});

        //res.redirect('/directory/'+id+'/'+replacesting+'');

             }) }
             })
                
             })
        }
    else{
        
       		       res.send(errors);

    }
    
     
}
exports.ajaxpopup = function(req,res){
     var busniessId= req.params.businessid;
                  let resultgetdata = "select * from business_ads where id = '"+busniessId+"'";
 db.query(resultgetdata,(err,letcountR)=>{
                 
          letcountR.forEach((resultdata)=>{
              var arryobject = {"title":resultdata.ads_title,"logo":resultdata.ads_logo,"city":resultdata.ads_city,"state":resultdata.ads_state,"id":resultdata.userid}
   res.json(arryobject)
          })
          })
         
}

exports.ajaxrating = function(req,res){
    
      var busniessId= req.params.businessid;
     
         
                   
             let letcount = "select count(*) as  count  from reviews where businessId ='"+busniessId+"' and ratingNo=1";
             let letcount2 = "select count(*) as  count  from reviews where businessId ='"+busniessId+"' and ratingNo=2";
             let letcount3 = "select count(*) as  count  from reviews where businessId ='"+busniessId+"' and ratingNo=3";
             let letcount4 = "select count(*) as  count  from reviews where businessId ='"+busniessId+"' and ratingNo=4";
             let letcount5 = "select count(*) as  count  from reviews where businessId ='"+busniessId+"' and ratingNo=5";
             db.query(letcount,(err,letcountR)=>{ 
             db.query(letcount2,(err,letcountR2)=>{
             db.query(letcount3,(err,letcountR3)=>{
             db.query(letcount4,(err,letcountR4)=>{
             db.query(letcount5,(err,letcountR5)=>{
                 
          letcountR.forEach((letcountRq)=>{
           letcountR2.forEach((letcountRq2)=>{
          letcountR3.forEach((letcountRq3)=>{
          letcountR4.forEach((letcountRq4)=>{
          letcountR5.forEach((letcountRq5)=>{
              
             var reviewacount1 =  letcountRq.count+letcountRq2.count+letcountRq3.count+letcountRq4.count+letcountRq5.count;
            var reviewacount = (5*letcountRq5.count + 4*letcountRq4.count + 3*letcountRq3.count + 2*letcountRq2.count + 1*letcountRq.count)/reviewacount1;
             
                if(reviewacount >=5){
                      var className='five';
                      }
              else if(reviewacount >= 4.5){
                      var className='fourhalf';
                      }
              else if(reviewacount >=4){
                  var className='four';
              }
              
             
              else if(reviewacount >=3.5){
                      var className='threehalf';
                      }
               else if(reviewacount >=3){
                      var className='three';
                      }
               else if(reviewacount >=2.5){
                      var className='twohalf';
                      }
               else if(reviewacount >=2){
                      var className='two';
                      }
                else if(reviewacount >=1.5){
                      var className='onehalf';
                      }
               else if(reviewacount >=1){
                      var className='one';
                      }
              
                       else{
                            var className='';
                       }
              var arryobject = {"ratingavg":reviewacount,"ratingacount":reviewacount1,"businessid":busniessId,"class":className}
   res.json(arryobject)
             
          })
          })
          })
          })
          })
            })
             })
             })
             })
             })
             
           
     
       
            
}


exports.DirectoryList = function(req,res)
{
     var Dcategory = req.params.Dcategory;
     var locationR = req.params.location;
     
    var replacesting = Dcategory.replace(/-/g," ");
    var replacesting2 = replacesting.replace(/and/g,"&");
    
var numPerPage = 10;
     var page = req.query.page?req.query.page:1;

    var skip = (page - 1)*numPerPage;
    var limit = skip +  ',' + numPerPage;
  var pincode = req.query.pincode;
    

  function capital_letter(str) 
{
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}
   
    
     if(pincode){
       
         var Dcategorylist = "select business.*,m.image_path from business_ads as business left join media as m on m.id=(select min(nm.id) from media as nm where nm.post_id=business.id) where business.ads_category = '"+capital_letter(replacesting2)+"' and business.pincode='"+pincode+"' order by business.id DESC limit "+numPerPage+" OFFSET "+skip+"";
         
         var pincodechk ="select count(*) as count from business_ads where ads_category = '"+capital_letter(replacesting2)+"' and pincode='"+pincode+"' ";
           
        }
    
    else{
       if(typeof locationR === "undefined"){
     var Dcategorylist = "select business.*,m.image_path from business_ads as business left join media as m on m.id=(select min(nm.id) from media as nm where nm.post_id=business.id) where business.ads_category = '"+capital_letter(replacesting2)+"' order by business.id DESC limit "+numPerPage+" OFFSET "+skip+""; 
           var pincodechk ="select count(*) as count from business_ads where ads_category = '"+capital_letter(replacesting2)+"'";
         
    }  
        else{
            var Dcategorylist = "select business.*,m.image_path from business_ads as business left join media as m on m.id=(select min(nm.id) from media as nm where nm.post_id=business.id) where business.ads_category = '"+capital_letter(replacesting2)+"' and business.ads_city ='"+locationR+"' order by business.id DESC limit "+numPerPage+" OFFSET "+skip+"";
            var pincodechk ="select count(*) as count from business_ads where ads_category = '"+capital_letter(replacesting2)+"' and ads_city='"+locationR+"' ";
           
        }
        
    }
    db.query(pincodechk,function(err,countall){ 
    var countnew = countall[0].count/numPerPage;
 var countceil =Math.ceil(countnew);
   
     
    
     
     db.query(Dcategorylist,(err,DcategorylistR)=>{
    
       
              let CatfillterP = "select  parent_category  from  directoryc where category_name='"+replacesting2+"'";
              let CatfillterPa = "select  category_name   from  directoryc where parent_category is null";
       
           
        
      
          
       
db.query(CatfillterP,(err,CatfillterPR)=>{
    if(CatfillterPR.length > 0){ 
    console.log(CatfillterPR[0].parent_category);
    var parentCategory = CatfillterPR[0].parent_category;
    }
    if (parentCategory === null ){
       var Catfillter =   "select  category_name  from  directoryc where parent_category = '"+capital_letter(replacesting2)+"'";
        
    }
    else {
         var Catfillter =   "select  category_name  from  directoryc where parent_category = '"+parentCategory+"'";
    }
 
 
      
            db.query(Catfillter,(err,CatfillterR)=>{
            db.query(CatfillterPa,(err,CatfillterRa)=>{
         res.render('frontend/business-list.ejs',{
        req:req, 
           DcategorylistR:DcategorylistR,  
             Dcategory:replacesting,
             pincode:pincode,
              count:countceil,
             locationR:locationR,
             currentPage:page,
                     CatfillterPa:CatfillterRa,
         
     }); 
     }); 
     }); 
     })
     }); 
         
    
     })
    
    
}

exports.SearchboxList = function(req,res)
{
     var Dcategory = req.query.q;
     var locationR = req.params.location;
     var searchQuery = req.query.q;
   
   
var numPerPage = 10;
     var page = req.query.page?req.query.page:1;

    var skip = (page - 1)*numPerPage;
    var limit = skip +  ',' + numPerPage;
  var pincode = req.query.pincode;
    

  function capital_letter(str) 
{
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}
   
    
      var Dcategorylist = "select business.*,m.image_path from business_ads as business left join media as m on m.id=(select min(nm.id) from media as nm where nm.post_id=business.id) where business.ads_category like '%"+searchQuery+"%' order by business.id DESC limit "+numPerPage+" OFFSET "+skip+""; 
       var pincodechk ="select count(*) as count from business_ads where ads_category like '%"+searchQuery+"%'";
    db.query(pincodechk,function(err,countall){ 
    var countnew = countall[0].count/numPerPage;
 var countceil =Math.ceil(countnew);
   
     
    
     
        
        let CatfillterPa = "select  category_name   from  directoryc where parent_category is null";
       
           
          

 
            db.query(Dcategorylist,(err,DcategorylistR)=>{
                db.query(CatfillterPa,(err,CatfillterRa)=>{
         res.render('frontend/search.ejs',{
        req:req, 
          
             Dcategory:Dcategory,
        
              count:countceil,
             locationR:'',
              pincode:'',
             currentPage:page,  DcategorylistR:DcategorylistR,  
                         CatfillterPa:CatfillterRa,
         
     }); 
     }); 
     }); 
 
    
         
    
     })
    
    
}

exports.professionalsearch = function(req,res){
    
    var locationR = req.body.locationSrch;
     var Dcategory = req.body.categorySrch;
     var locationRNew= locationR ? '/'+locationR:'';
     var replacesting = Dcategory.replace(/ /g,"-");
    var replacesting2 = replacesting.replace(/&/g,"and");
    var pincode = req.body.pincode;
      
 var withDcategory= replacesting2 ? '/'+replacesting2:'';
 var withpincode= locationR ? '/'+'?pincode='+locationR:'';
    function is_Numeric(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}  
    
    var chektrue = is_Numeric(locationR);
    
    if(chektrue === true){
            res.redirect('/directory'+withDcategory+withpincode)
     
    }
  
   else{
 res.redirect('/directory'+locationRNew+withDcategory)
        
        
       
   }
    
   
 
    
}
exports.Costsearch = function(req,res){
    
    var locationR = req.body.locationSrch;
     var locationRNew= locationR ? '/'+locationR:'';
  
    var pincode = req.body.pincode;
       var Dcategory = req.body.categorySrch;
 var withDcategory= Dcategory ? '/'+Dcategory:'';
 var withpincode= locationR ? '/'+'?pincode='+locationR:'';
    function is_Numeric2(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}  
    
    var chektrue = is_Numeric2(locationR);
    
    if(chektrue === true){
        res.redirect('/cost-compare'+withDcategory+withpincode)
     
    }
   else{
     res.redirect('/cost-compare'+locationRNew+withDcategory)
        
   }
    
 
    
}

exports.Costcompare = function(req,res)
{
    
     var locationR = req.params.location;
     var Dcategory = req.params.Dcategory;
     var pincode = req.query.pincode;
    
    
  if(pincode){
           var  resultCompair = "select * from pricing where ads_category='"+Dcategory+"' and pincode='"+pincode+"' order by hourly asc";
        }
    
    else{
       if(typeof locationR === "undefined"){
         var  resultCompair = "select * from pricing where ads_category='"+Dcategory+"'";
       
         
    }  
        else{
            var  resultCompair = "select * from pricing where ads_category='"+Dcategory+"' and ads_city='"+locationR+"'";
           
        }
        
    }
   
   
   
     let categoriesname = "select * from  directoryc  order by category_name  ASC";
     
     let citites = "select * from cities";
    db.query(categoriesname,(err,categoriesname)=>{
    db.query(resultCompair,(err,resultpricing)=>{
    db.query(citites,(err,cititesr)=>{
     res.render('frontend/cost-listing.ejs',{
        req:req,  
         resultpricing:resultpricing,
         categoriesr:categoriesname,
         cititesr:cititesr,
         pincode:pincode,
           Dcategory:Dcategory,
         locationR:locationR,
         
     });    
     });    
     });    
     })
    
    
}
exports.Costguide = function(req,res)
{
    
    
     let categoriesname = "select * from  directoryc  order by category_name  ASC";
     let citites = "select * from cities";
    db.query(categoriesname,(err,categoriesname)=>{
    db.query(citites,(err,cititesr)=>{
     res.render('frontend/cost-guide.ejs',{
        req:req,  
         categoriesr:categoriesname,
         cititesr:cititesr,
         
     });    
     });    
        
        
    })
    
    
}

exports.Directory = function(req,res)
{
    
    
     let categoriesname = "select * from  directoryc  order by category_name  ASC";
     let citites = "select * from cities";
    db.query(categoriesname,(err,categoriesname)=>{
    db.query(citites,(err,cititesr)=>{
     res.render('frontend/directory.ejs',{
        req:req,  
         categoriesr:categoriesname,
         cititesr:cititesr,
         
     });    
     });    
        
        
    })
    
    
}

exports.Contactget = function(req,res)
{
     res.render('frontend/contact.ejs',{
        req:req,  
         
     });
    
}
exports.Aboutget = function(req,res)
{
     res.render('frontend/about.ejs',{
        req:req,  
         
     });
    
}

exports.forgotPass = function(req,res)
{
     res.render('frontend/lostpassword.ejs',{
        req:req,  
         errors:[],
         Sucessmsg:'',
          mailchkdb:'',
     });
    
}

exports.forgotPost= function(req,res){
    
    
    
         var errors = validationResult(req);
      var checkemail = req.body.email;

    
    var letCheck = "select * from user_login where email = '"+checkemail+"'";
    
  
    
if(errors.isEmpty()) {
    
       db.query(letCheck,(err,letCheck)=>{
         
         if(letCheck.length > 0 ){
             var passowrdrandom = Math.floor(Math.random() * 100000) + 1;
          
             
             
             var updatepassword = "update user_login set password='"+passowrdrandom+"'  where email = '"+letCheck[0].email+"'";  
             console.log(updatepassword);
             db.query(updatepassword,(err,updatepassword)=>{
             
             
                 var htmlmailer = '<table align="center" style="border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px"><tbody><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0"><table width="100%" style="border-spacing:0;font-family:sans-serif;color:#333333"><tbody><tr><td style="padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;line-height:18px;width:100%;text-align:left"><p style="Margin:0;font-weight:bold;font-size:14px;Margin-bottom:10px">Dear '+letCheck[0].email+',</p><p style="Margin:0;font-size:14px;Margin-bottom:10px">Please use this  password for the thelivro account.<span class="il">'+letCheck[0].email+'</span>.</p></td></tr><tr><td style="padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;line-height:18px;width:100%;text-align:left"><p style="Margin:0;font-size:14px;Margin-bottom:10px"><strong>Here is your Password:</strong>'+passowrdrandom+'</p></td></tr><tr><td style="padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;line-height:18px;width:100%;text-align:left"><p style="Margin:0;font-size:14px;Margin-bottom:10px">Warm Regards,</p> <br> <p style="Margin:0;font-size:14px;Margin-bottom:10px">Team Thelivro</p></td></tr></tbody></table></td></tr></tbody></table>';
             
             let transporter = nodemailer.createTransport({
    service:'gmail',
    
    auth: {
      user: 'trendsxp945@gmail.com', // generated ethereal user
      pass: 'aA@9639984409' // generated ethereal password
    }
  });


  let mailOptions = {
    from: '"thelivro Notification" <trendsxp945@gmail.com>', // sender address
    to: letCheck[0].email, // list of receivers
    subject: "Forgotten password request", // Subject line
    text: "Hello world?", // plain text body
    html: htmlmailer // html body
  }

 transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
           res.render('frontend/lostpassword.ejs',{
             
               req:req,
         errors:[],
            mailchkdb:'',
            Sucessmsg:'Check Your Email Id For New Password.',
                    

           })       
             });
         }
           else{
                res.render('frontend/lostpassword.ejs',{
             
               req:req,
         errors:[],
                    Sucessmsg:'',
            mailchkdb:'Sorry,email id not register'
                    

           }) 
               
           }
         
     })
    
  
   
}  
       
 
    else{
          res.render('frontend/lostpassword.ejs',{
             
               req:req,
              errors:errors.errors,
                   mailchkdb:'',

           })
    }
}
exports.userMessage = function(req,res){
    
        let errors = validationResult(req);

    
      var id = req.body.user_id;
      var user_name = req.body.user_name;
      var user_email = req.body.user_email;
      var user_mobile = req.body.user_mobile;
      var user_message = req.body.user_message;
      var post_id = req.body.post_id;
    
     if(errors.isEmpty()){
         
         db.query("select * from message where post_id='"+post_id+"' and user_id='"+id+"'",(err,Selectmessage)=>{
             if(Selectmessage.length > 0){
             res.json({Fmessage:'Message already send'}) 
             }
             else{
                 let insertMessage = "insert into message (user_name,user_email,user_mobile,user_message,user_id,post_id) values ('"+user_name+"','"+user_email+"','"+user_mobile+"','"+user_message+"','"+id+"','"+post_id+"')";
                          db.query(insertMessage,(err,insertMessageR)=>{
                                           res.json({Smessage:'Message Sucessfully send'}) 

                              
                          })
                 
             }
         })
         
     }
    	else{
		   res.json(errors) 
		
}
}
exports.Privacyget = function(req,res)
{
     res.render('frontend/privacy.ejs',{
        req:req,  
         
     });
    
}
exports.Termsget = function(req,res)
{
     res.render('frontend/terms.ejs',{
        req:req,  
         
     });
    
}
exports.Farming = function(req,res)
{
            
        let populerP = "select * from news where big_news = '1'  order by id DESC LIMIT 4";
        let bignews = "select * from news where news_category='agriculture' order by id DESC LIMIT 1";
        let smallnews = "select * from news where news_category='agriculture' or news_category='garden' order by id DESC   LIMIT 1,5";
      db.query("select * from products where category ='plants' or category='seeds' or category='soil-fertilizer'  order by id desc limit 8",(err,psproduct)=>{
        
     db.query(bignews,(err,bignewsR)=>{
     db.query(smallnews,(err,smallnewsR)=>{
     db.query(populerP,(err,populerP)=>{

     res.render('frontend/farming.ejs',{
        req:req,  
         psproduct:psproduct,
         populerP:populerP,
         bignewsR:bignewsR,
         smallnewsi:smallnewsR,
         
     });
     });
     });
     });
     });
}