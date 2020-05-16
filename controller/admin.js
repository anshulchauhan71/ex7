var configconnect = require('../config/db');
var fs = require('fs');
const sharp = require('sharp')

exports.Login = function (req, res) {


	res.render('admin/login.ejs');

}
exports.Adminindex = function (req, res) {


	res.render('admin/index.ejs');

};
exports.Addproduct = function (req, res) {


	res.render('admin/add-product.ejs',{
        
        message:'',
        req:req,
        
    });

}
exports.UpdateProduct = function(req,res){
                       let id = req.params.id;
                        
                          let title = req.body.title;
                          let category  = req.body.category;
                          let subcategory = req.body.subcategory;
                          let storename   = req.body.storename;
                          let offerprice   = req.body.offerprice;
                          let offer   = req.body.offer;
                          let link   = req.body.link;
                          let price   = req.body.price;
                            let nimage = req.files['nimage']?req.files['nimage'][0]:'';
                           let updateimage  = req.body.updateimage;

                          let letupdateimg = nimage.filename?nimage.filename:updateimage;
                          let homepage   = req.body.homepage;
                       
                          let long  = req.body.long;
                              let meta_title = req.body.meta_title;
                          let meta_keywords = req.body.meta_keywords;
                          let meta_desc  = req.body.meta_desc;
   

  let query ="update products  set category='"+category+"',title='"+title+"',des='"+long+"',logo='"+letupdateimg+"',price='"+price+"',url='"+link+"',offer='"+offer+"',store='"+storename+"',offerprice='"+offerprice+"', homepage='"+homepage+"',metatitle='"+meta_title+"',metakeyword='"+meta_keywords+"',metadescription='"+meta_desc+"'  where id = '"+id+"'";
    
    db.query(query,(err,businessitem)=>{
      res.redirect(req.originalUrl)
        
        
    })
}
exports.PostProduct = function (req, res){
                       let newstitle = req.body.newstitle;
                          let title = req.body.title;
                          let category  = req.body.category;
                          let subcategory = req.body.subcategory;
                          let storename   = req.body.storename;
                          let offerprice   = req.body.offerprice;
                          let offer   = req.body.offer;
                          let link   = req.body.link;
                          let price   = req.body.price;
                            let nimage = req.files['nimage']?req.files['nimage'][0]:'';
                        
                          let homepage   = req.body.homepage;
                       
                          let long  = req.body.long;
                              let meta_title = req.body.meta_title;
                          let meta_keywords = req.body.meta_keywords;
                          let meta_desc  = req.body.meta_desc;
   

    let newsSelet = "select * from products where title ='"+newstitle+"'";
     console.log(newsSelet);
    db.query(newsSelet,(err,newsresult) =>{
        
        if(newsresult.length > 0){
             
          Getnewsid(req,res,message='result not Found')
            
     
    }
          
        else {
            
            
                        if (err) {
                            return res.status(500).send(err);
                        }
                        
                     let inserNews = " INSERT INTO `products`(`category`, `title`, `des`, `logo`, `price`, `url`, `offer`,`store`,`offerprice`, `homepage`, `metatitle`, `metakeyword`, `metadescription`) VALUES ('"+category+"','"+title+"','"+long+"','"+nimage.filename+"','"+price+"','"+link+"','"+offer+"','"+storename+"','"+offerprice+"','"+homepage
+"','"+meta_title+"','"+meta_keywords+"','"+meta_desc+"')";
                        
                        
                        
                       
                        
                        db.query(inserNews,(err,newsaddresult) =>{
                           
                            res.redirect('/adminxp/product');
                        })
                   
               
          

        
  
   
            }
    
    
        });
}

exports.GetProduct = function(req,res){
let tag_id = req.params.id;
    var numPerPage = 10;
    
      var page = req.query.page?req.query.page:1;

    console.log(page);
    var skip = (page - 1)*numPerPage;
    var limit = skip +  ',' + numPerPage;
  
    db.query('select count(*) as count from products',function(err,countall){
        var query='select * from products  limit '+numPerPage+' OFFSET '+skip;
        var countnew = countall[0].count/numPerPage;
       

         db.query(query,(err,result)=>{
             
          res.render('admin/view-product.ejs',{
              count:countnew,
               newslist:result, 
              currentPage:page,
               
          })
        
        
    })
    })
    
   
}

exports.Editproduct = function(req,res){
let id = req.params.id;
  let query ="select * from products where id = '"+id+"'";
    
    db.query(query,(err,businessitem)=>{
          res.render('admin/edit-product.ejs',{
              
             businessitem:businessitem, 
              message:'',
              
          })
        
        
    })
};

exports.deleteproduct = function(req,res){
    
    
let id = req.params.id;
      const targetUrl =  req.originalUrl;

    let SelectQuery = "select * from products where id='"+id+"'";
    let deleteQuery = "delete from products where id='"+id+"'";
    
    db.query(SelectQuery,(err,SelectQueryResult)=>{
        
        var imagename  =SelectQueryResult[0].logo;
         fs.unlink(`public/post/${imagename}`,(err)=> { 
               db.query(deleteQuery,(err,deleteResult)=>{
           res.redirect('/adminxp/product');
        
    })
         })
  
    })
}

exports.Loginpost = function(req,res){ 

    let admin_email = req.body.email;
    let admin_password = req.body.password;
    let Checkuser = "select * from admin_login where  admin = '"+admin_email+"'";
    
   
    
    db.query(Checkuser,(err,GetLogin)=>{
        
      
        if(GetLogin.length > 0){
              req.session.adminlogin = true;
				
                req.session.adminuserId = GetLogin[0].id;
                req.session.adminemail = GetLogin[0].email;
            
            
          
            
           res.redirect('/adminxp')
            
        }
        else{
            res.redirect('/adminxp/login')
        }
       
    })

} 
//Category  Controllers  Start



exports.BGetcategory = function (req, res) {

	let cat_names = req.params.cat_names;
	let categoryqyery = "select * from directoryc";

	db.query(categoryqyery, (err, result) => {

		res.render('admin/add-bcat.ejs', {

			message: '',
			categorylist: result,


		});

	})


}
exports.BPostcategory = function (req, res) {

	let message = '';

	let cat_name = req.body.cat_name;
	let p_categroy = req.body.p_categroy;
//	let cat_image = req.files.cat_image?req.files.cat_image :'uhjfgfg';
//	let cat_imagename = cat_image.name?cat_image.name:'fdfdf';
//	let fileextention = cat_image.mimetype.split('/')[1];

	let categoryqyery = "select * from directoryc where category_name = '" + cat_name + "'";


	db.query(categoryqyery, (err, result) => {

		if (result.length > 0) {

			if (err) {

				return res.status(500).send(err);
			} else {
                
                let categoryqyery = "select * from directoryc";
                db.query(categoryqyery, (err, resultw) => { res.render('admin/add-bcat.ejs', {
categorylist:resultw,
					message: 'category already added',

				}); });
                
				

			}
		} else {
let insertcat = "insert into directoryc (category_name,parent_category) values ('" + cat_name + "','" + p_categroy + "')";
					db.query(insertcat, (err, result) => {

						res.redirect('/adminxp/add-bcat');
					})

//			cat_imagename = cat_name + '.' + fileextention;+ cat_imagename +

//			if (cat_image.mimetype === 'image/png' || cat_image.mimetype === 'image/jpeg' || cat_image.mimetype === 'image/gif') {
//
//				cat_image.mv(`public/images/${cat_imagename}`, (err) => {
//
//					if (err) {
//
//						return res.status(500).send(err);
//
//					}
//					let insertcat = "insert into category (category_name,category_image,parent_category) values ('" + cat_name + "','" + cat_imagename +
//						"','" + p_categroy + "')";
//					db.query(insertcat, (err, result) => {
//
//						res.redirect('/adminxp/add-category');
//					})
//				});
//
//			} else {
//
//				message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
//				res.render('admin/add-player.ejs', {
//					message,
//					title: 'Welcome to Socka '
//				});
//			}

		}
	})


}
exports.BViewcategory = function (req, res) {

	let categoryqyery = "select * from directoryc  where category_name!='' ";
	db.query(categoryqyery, (err, result) => {

		res.render('admin/view-bcat.ejs', {

			category2: result,


		});

	});


}
exports.BEditcategory = function (req, res) {
	let categoryId = req.params.id;

	let query = "select * from directoryc where id = '" + categoryId + "'";

	db.query(query, (err, result) => {

		let query = "select * from directoryc";
		db.query(query, (err, result2) => {

			res.render('admin/cateory-bedit.ejs', {

				updateValue: result[0],
				updateValue2: result2,
				message: '',
			})

		})


	});


}
exports.BDeletecategory = function (req, res) {


	let categoryId = req.params.id;
	let querselet = "select category_image from directoryc where id = '" + categoryId + "'";
	let deletquery = "delete from directoryc where id='" + categoryId + "' ";

	db.query(querselet, (err, result) => {
    let category_image = result[0].category_image;
		fs.unlink(`public/images/${category_image}`, (err) => {

			db.query(deletquery, (err, result) => {

				res.redirect('/adminxp/view-bcat');

			});

		})

	})


}

exports.Updatecateory = function(req,res){
    
}


exports.Getcategory = function (req, res) {

	let cat_names = req.params.cat_names;
	let categoryqyery = "select * from category";

	db.query(categoryqyery, (err, result) => {

		res.render('admin/add-category.ejs', {

			message: '',
			categorylist: result,


		});

	})


}
exports.Postcategory = function (req, res) {

	let message = '';

	let cat_name = req.body.cat_name;
	let p_categroy = req.body.p_categroy;
//	let cat_image = req.files.cat_image?req.files.cat_image :'uhjfgfg';
//	let cat_imagename = cat_image.name?cat_image.name:'fdfdf';
//	let fileextention = cat_image.mimetype.split('/')[1];

	let categoryqyery = "select * from category where category_name = '" + cat_name + "'";


	db.query(categoryqyery, (err, result) => {

		if (result.length > 0) {

			if (err) {

				return res.status(500).send(err);
			} else {
                
                let categoryqyery = "select * from category";
                db.query(categoryqyery, (err, resultw) => { res.render('admin/add-category.ejs', {
categorylist:resultw,
					message: 'category already added',

				}); });
                
				

			}
		} else {
let insertcat = "insert into category (category_name,parent_category) values ('" + cat_name + "','" + p_categroy + "')";
					db.query(insertcat, (err, result) => {

						res.redirect('/adminxp/add-category');
					})

//			cat_imagename = cat_name + '.' + fileextention;+ cat_imagename +

//			if (cat_image.mimetype === 'image/png' || cat_image.mimetype === 'image/jpeg' || cat_image.mimetype === 'image/gif') {
//
//				cat_image.mv(`public/images/${cat_imagename}`, (err) => {
//
//					if (err) {
//
//						return res.status(500).send(err);
//
//					}
//					let insertcat = "insert into category (category_name,category_image,parent_category) values ('" + cat_name + "','" + cat_imagename +
//						"','" + p_categroy + "')";
//					db.query(insertcat, (err, result) => {
//
//						res.redirect('/adminxp/add-category');
//					})
//				});
//
//			} else {
//
//				message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
//				res.render('admin/add-player.ejs', {
//					message,
//					title: 'Welcome to Socka '
//				});
//			}

		}
	})


}
exports.Viewcategory = function (req, res) {

	let categoryqyery = "select * from category  where category_name!='' ";
	db.query(categoryqyery, (err, result) => {

		res.render('admin/view-category.ejs', {

			category2: result,


		});

	});


}
exports.Editcategory = function (req, res) {
	let categoryId = req.params.id;

	let query = "select * from category where id = '" + categoryId + "'";

	db.query(query, (err, result) => {

		let query = "select * from category";
		db.query(query, (err, result2) => {

			res.render('admin/cateory-edit.ejs', {

				updateValue: result[0],
				updateValue2: result2,
				message: '',
			})

		})


	});


}
exports.Deletecategory = function (req, res) {


	let categoryId = req.params.id;
	let querselet = "select category_image from category where id = '" + categoryId + "'";
	let deletquery = "delete from category where id='" + categoryId + "' ";

	db.query(querselet, (err, result) => {
    let category_image = result[0].category_image;
		fs.unlink(`public/images/${category_image}`, (err) => {

			db.query(deletquery, (err, result) => {

				res.redirect('/adminxp/view-category');

			});

		})

	})


}

exports.Updatecateory = function(req,res){
    
}


exports.Edittags = function(req,res) {
    
    let getTags = req.params.id;
    let message = '';
   let querytag = "select * from tags where id = '"+getTags+"' ";
     db.query(querytag,(err,result)=>{
         
    res.render('admin/edit-tags.ejs',{
   taglist:result[0],
        message:message,
    }); });
    
   
   
    
}

exports.Updatetag = function(req,res){
    let tag_name = req.body.tag_name;
    let query ="select * from tags where tag_name = '"+tag_name+"' ";
    
    db.query(query,(err,result)=>{
        
        if(result.length > 0){
            
            res.render('admin/edit-tags.ejs',{
  taglist:result[0],
        message:"already found",
    }); 
        }
        else {
             let tag_id = req.params.id;
            let updatequery= "update  tags  set tag_name = '"+tag_name+"' where id='"+tag_id+"' ";
            db.query(updatequery,(err,result)=>{
                
                res.redirect('/adminxp/add-tag')
            })
        }
    })
    
    
}
exports.Deletetag = function(req,res){
let tag_id = req.params.id;
  let query ="delete from tags where id = '"+tag_id+"' ";
    
    db.query(query,(err,result)=>{
          res.redirect('/adminxp/add-tag');
        
        
    })
}

exports.Addtag = function(req,res) {
    
    
     
    getTagsfunc(req,res,'')
   
    
}


function getTagsfunc(req,res,message){
       let querytag = "select * from tags";
    
    db.query(querytag,(err,result)=>{
        res.render('admin/add-tag.ejs',{
        
        taglist:result,
        message:message,
    }) 
        
    })
}
exports.Posttag = function(req,res) {
    
    let Tagname = req.body.tag_name;
    let querytag = "select * from tags where tag_name =  '"+Tagname+"'";
    
    db.query(querytag,(err,result)=>{
        
        if(result.length > 0){
           
                
         getTagsfunc(req,res,'Already found')
        
        
        
        
       
     
            
            
        }
             
             else{
                 
                 
                 
                  let querytag = "insert into  tags (tag_name) values ('"+Tagname+"')" ;
                 
                 
                 
                 db.query(querytag,(err,result)=>{
                     res.redirect('/adminxp/add-tag');
                     
                 })
                 
                 
                 
             }
        
    })
    
   
    
}


//exports.viewadminnews=function(req,res){
//     var limit = 10;
//    var page = req.query.page?req.query.page:1;
//      var offset = (page - 1) * limit;
//
// 
//    var page2  = parseInt(req.query.page,20) || 1;
//    console.log(page2);
//        var query="select * from news  limit "+limit+" OFFSET "+offset+"";
//   
//        db.query(query,function(err,newslist){
//            var letlength = newslist.length;
//      
//            res.render('admin/view-news.ejs',{
//                
//                newslist:newslist, 
//                req:req,res:res,
//              pageCount:letlength,
//                currentPage:page,
//            
//            });
//        })
//
//}


//Category  Controllers  End

//AddNews  Controllers  End
exports.viewadminnews = function(req,res){
let tag_id = req.params.id;
    var numPerPage = 10;
    
      var page = req.query.page?req.query.page:1;

    console.log(page);
    var skip = (page - 1)*numPerPage;
    var limit = skip +  ',' + numPerPage;
  
    db.query('select count(*) as count from news',function(err,countall){
        var query='select * from news  limit '+numPerPage+' OFFSET '+skip;
        var countnew = countall[0].count/numPerPage;
       

         db.query(query,(err,result)=>{
             
          res.render('admin/view-news.ejs',{
              count:countnew,
               newslist:result, 
              currentPage:page,
               
          })
        
        
    })
    })
    
   
}

exports.usersList=function(req,res){
    var numPerPage = 1;
    var page = parseInt(req.query.page, 10) || 1;
    var skip = (page - 1) * numPerPage;
    var limit = skip + ',' + numPerPage;
    con.query('select count(*) as count from users',function(err,countall){
        var query='select * from users order by id desc limit '+limit;
        con.query(query,function(err,users){
            res.render('admin/users',{title:'Dayal Tours | Users List',users:users,req:req,res:res,count:countall[0].count});
        })
    });
}

exports.viewusernews = function(req,res){
let tag_id = req.params.id;
  let query ="select * from news where postBy is not null";
    
    db.query(query,(err,result)=>{
          res.render('admin/view-usernews.ejs',{
              
             newslist:result, 
              
          })
        
        
    })
} 

exports.userList = function(req,res){
let tag_id = req.params.id;
  let Getbusiness ="select * from user_login";
    
    db.query(Getbusiness,(err,result)=>{
          res.render('admin/view-user.ejs',{
              
             newslist:result, 
              
          })
        
        
    })
}
exports.deleteuser = function(req,res){
    
    
let id = req.params.id;
      const targetUrl =  req.originalUrl;

    let deleteQuery = "delete from user_login where id='"+id+"'";
    
    db.query(deleteQuery,(err,deleteResult)=>{
           res.redirect('/adminxp/user');
        
    })
}

exports.activestatusu = function(req,res){
    
    
let id = req.params.id;
      const targetUrl =  req.originalUrl;

    let deleteQuery = "update  user_login set status = '"+0+"' where id='"+id+"'";
    
    db.query(deleteQuery,(err,deleteResult)=>{
           res.redirect('/adminxp/user');
        
    })
}
exports.deactivestatusu = function(req,res){
    
    
let id = req.params.id;
      const targetUrl =  req.originalUrl;

    let deleteQuery = "update  user_login set status = '"+1+"' where id='"+id+"'";
    
    db.query(deleteQuery,(err,deleteResult)=>{
           res.redirect('/adminxp/user');
        
    })
}




exports.activestatusp = function(req,res){
    
    
let id = req.params.id;
      const targetUrl =  req.originalUrl;

    let deleteQuery = "update  products set status = '"+0+"' where id='"+id+"'";
    
    db.query(deleteQuery,(err,deleteResult)=>{
           res.redirect('/adminxp/product');
        
    })
}
exports.deactivestatusp = function(req,res){
    
    
let id = req.params.id;
      const targetUrl =  req.originalUrl;

    let deleteQuery = "update  products set status = '"+1+"' where id='"+id+"'";
    
    db.query(deleteQuery,(err,deleteResult)=>{
           res.redirect('/adminxp/product');
        
    })
}


exports.Getbusiness = function(req,res){
let tag_id = req.params.id;
  let Getbusiness ="select * from business_ads";
    
    db.query(Getbusiness,(err,result)=>{
          res.render('admin/view-business.ejs',{
              
             newslist:result, 
              
          })
        
        
    })
}

exports.Editbusiness = function(req,res){
let id = req.params.id;
  let query ="select * from business_ads where id = '"+id+"'";
    
    db.query(query,(err,businessitem)=>{
          res.render('admin/edit-business.ejs',{
              
             businessitem:businessitem, 
              message:'',
              
          })
        
        
    })
}

exports.updatebusiness = function(req,res){
let id = req.params.id;
                        let meta_title = req.body.metatitle;
                          let meta_keywords = req.body.metakeyword;
                          let meta_desc  = req.body.metadescription;
  let query ="update business_ads  set metatitle='"+meta_title+"',metakeyword='"+meta_keywords+"',metadescription='"+meta_desc+"'  where id = '"+id+"'";
    
    db.query(query,(err,businessitem)=>{
      res.redirect(req.originalUrl)
        
        
    })
}

exports.deletebusiness = function(req,res){
    
    
let id = req.params.id;
      const targetUrl =  req.originalUrl;

    let deleteQuery = "delete from business_ads where id='"+id+"'";
    
    db.query(deleteQuery,(err,deleteResult)=>{
           res.redirect('/adminxp/business');
        
    })
}
exports.activestatus = function(req,res){
    
    
let id = req.params.id;
      const targetUrl =  req.originalUrl;

    let deleteQuery = "update  business_ads set status = '"+0+"' where id='"+id+"'";
    
    db.query(deleteQuery,(err,deleteResult)=>{
           res.redirect('/adminxp/business');
        
    })
}
exports.deactivestatus = function(req,res){
    
    
let id = req.params.id;
      const targetUrl =  req.originalUrl;

    let deleteQuery = "update  business_ads set status = '"+1+"' where id='"+id+"'";
    
    db.query(deleteQuery,(err,deleteResult)=>{
           res.redirect('/adminxp/business');
        
    })
}

exports.newEdit = function(req,res){
      let newsId = req.params.id;
  let query = "select * from news where id = '"+newsId+"'";
db.query(query,(err,result)=>{ 
  if(err){

    return res.status(500).send(err);
  }

  let query = "select * from category";

  db.query(query,(err,result2)=>{ 
  
    let query = "select distinct state from cities";
    db.query(query,(err,resultcity)=> {
      let query = "select * from cities";
      db.query(query,(err,resultcity2)=> {
        res.render('admin/edit-news.ejs',{
          newsedit:result[0],
          categorylist:result2,
          cityshow:resultcity,
          cityshow2:resultcity2,
        })
       } );
    

    })


   
  });

})
}


exports.PostNews = function(req,res,message){
                         
                          let newstitle = req.body.newstitle;
                          let subtitle = req.body.subtitle;
                          let category  = req.body.category;
                          let subcategory = req.body.subcategory;
                          let state   = req.body.state;
                          let country   = req.body.country;
                          let city   = req.body.city;
                          let top_news   = req.body.top_news;
                          let latest_news   = req.body.latest_news;
                          let big_news   = req.body.big_news;
                          let publisher  = req.body.publisher;
                          
                           let nimage = req.files['nimage']?req.files['nimage'][0]:'';
                        
                          let video  = req.body.video;
                          let tags  = req.body.tags;
                          let homepage   = req.body.homepage;
                          let short  = req.body.short;
                          let long  = req.body.long;
                              let meta_title = req.body.meta_title;
                          let meta_keywords = req.body.meta_keywords;
                          let meta_desc  = req.body.meta_desc;
   

    let newsSelet = "select * from news where news_title ='"+newstitle+"'";
     console.log(newsSelet);
    db.query(newsSelet,(err,newsresult) =>{
        
        if(newsresult.length > 0){
        
            
            
          Getnewsid(req,res,message='result not Found')
            
            
            
            
      
        
        
    }
          
        else {
            
            
            
          
                        if (err) {
                            return res.status(500).send(err);
                        }
                        
                     let inserNews = " INSERT INTO `news`(`news_title`, `news_subtitle`, `news_des`, `news_shortdes`, `news_image`, `news_category`, `sub_category`,`country`, `news_state`, `news_city`, `author_name`,`news_video`, `news_tags`, `homepage`, `metatitle`, `metakeyword`, `metadescription`,`top_news`,`latest_news`,`big_news`) VALUES ('"+newstitle+"','"+subtitle+"','"+long+"','"+short+"','"+nimage.filename+"','"+category+"','"+subcategory+"','"+country+"','"+state+"','"+city
+"','"+publisher+"','"+video+"','"+tags+"','"+homepage+"','"+meta_title+"','"+meta_keywords+"','"+meta_desc+"','"+top_news+"','"+latest_news+"','"+big_news+"')";
                        
                        
                        
                       
                        
                        db.query(inserNews,(err,newsaddresult) =>{
                            console.log(newsaddresult);
                            res.redirect('/adminxp/add-news');
                        })
                   
               
          

        
  
   
            }
    
    
        });
}

exports.updateNews = function(req,res,message){
                         
                          let newstitle = req.body.newstitle;
                          let id = req.params.id;
                          let subtitle = req.body.subtitle;
                          let category  = req.body.category;
                          let subcategory = req.body.subcategory;
                          let state   = req.body.state;
                          let country   = req.body.country;
                          let city   = req.body.city;
                          let top_news   = req.body.top_news;
                          let big_news   = req.body.big_news;
                          let latest_news   = req.body.latest_news;
                          let publisher  = req.body.publisher;
                           let homepage   = req.body.homepage;
                           let nimage = req.files['nimage']?req.files['nimage'][0]:'';
    let updateimage  = req.body.updateimage;
                          var newimage = nimage.filename?nimage.filename:updateimage;
                          let video  = req.body.video;
                          
                          let tags  = req.body.tags;
                         
                          let short  = req.body.short;
                          let long  = req.body.long;
                              let meta_title = req.body.meta_title;
                          let meta_keywords = req.body.meta_keywords;
                          let meta_desc  = req.body.meta_desc;


   
        
            
            
          
                     
            
            
           
                        
                     let newsUpdate =    " UPDATE `news` SET `news_title`='"+newstitle+"',`news_subtitle`='"+subtitle+"',`news_des`='"+long+"',`news_shortdes`='"+short+"',`news_image`='"+newimage+
            "',`news_category`='"+category+"',`sub_category`='"+subcategory+"',`country`='"+country+"',`news_state`='"+state+"',`news_city`='"+city+
            "',`author_name`='"+publisher+"',`news_video`='"+video+"',`news_tags`='"+tags+"',`homepage`='"+homepage+"',`metatitle`='"+meta_title+
                "', `metakeyword`='"+meta_keywords+"',`metadescription`='"+meta_desc+"',`top_news`='"+top_news+"',`latest_news`='"+latest_news+"',`big_news`='"+big_news+"' WHERE id = '"+id+"'";
                       
                        
                        db.query(newsUpdate,(err,newsUpdate) =>{
                           
                            res.redirect('/adminxp/admin-news');
                        })
                   
               
          

        
  
}

exports.deleteadminNews = function(req,res){
    
     
let id = req.params.id;
      const targetUrl =  req.originalUrl;
let SelectQuery = "select * from news where id='"+id+"'";
    let deleteQuery = "delete from news where id='"+id+"'";
    
    db.query(SelectQuery,(err,SelectQueryw)=>{
     var imagename = SelectQueryw[0].news_image;
        fs.unlink(`public/post/${imagename}`,(err)=> { 
            db.query(deleteQuery,(err,deleteResult)=>{
           res.redirect('/adminxp/admin-news');
        
    })
    })
    })
}




exports.activeadminNews = function(req,res){
    
    
let id = req.params.id;
      const targetUrl =  req.originalUrl;

    let deleteQuery = "update  news set status = '"+0+"' where id='"+id+"'";
    
    db.query(deleteQuery,(err,deleteResult)=>{
           res.redirect('/adminxp/add-news');
        
    })
}
exports.deactiveadminNews = function(req,res){
    
    
let id = req.params.id;
      const targetUrl =  req.originalUrl;

    let deleteQuery = "update  news set status = '"+1+"' where id='"+id+"'";
    
    db.query(deleteQuery,(err,deleteResult)=>{
           res.redirect('/adminxp/add-news');
        
    })
}
exports.deleteuserNews = function(req,res){
    
    
let id = req.params.id;
      const targetUrl =  req.originalUrl;

    let deleteQuery = "delete from news where id='"+id+"'";
    
    db.query(deleteQuery,(err,deleteResult)=>{
           res.redirect('/adminxp/user-news');
        
    })
}

function Getnewsid(req,res,message){

     let subcategory = req.params.parent_category;
    
    let Query = "select * from category where parent_category is null order by category_name" ;
    
    db.query(Query,(err,result)=>{
        
        
        
        let SateQury = "select distinct state from cities";
        
         db.query(SateQury,(err,cityresult)=>{
             
             
             let tagsquery = "select *  from tags";
             
             
             db.query(tagsquery,(err,tagslist)=>{
                 
                 let countriesquery = "select *  from countries";
                 
                  db.query(countriesquery,(err,counterys)=>{ 
                   res.render('admin/add-news.ejs',{
        
        message:message,
           
           countrylist:counterys,
           categorylist:result,
           tagslist:tagslist,
           citylist:cityresult,
    }) 
                  
                  });
                 
                
             
                });
             
         
              
             
         });
      
        
        
    })
   
     
 }
exports.Getnews = function(req,res){
    
    
     Getnewsid(req,res,'')
    
}


exports.Getsubcategory= function(req,res){  
    
let category_name = req.params.category;
    
    
    let getsub = "select distinct category_name from category where parent_category = '"+category_name+"' ";
    
    db.query(getsub,(err,resultsub)=>{
        
        var getSubcat = "<option value=''>Select</option>";
        
        resultsub.forEach((resultsub)=>{
            
            getSubcat += '<option value="'+resultsub.category_name+'">'+resultsub.category_name+'</option>';
        })
        res.json({getSubcat})
    })
    


} 


exports.Getcity = function(req,res){
    
    
    let statename = req.params.state;
    
    let SateQury = "select distinct city from cities where state = '"+statename+"' ";
             
  
       db.query(SateQury,(err,getcity)=>{
       
         var get_city ="<option>Select</option>";
           getcity.forEach((getitems)=>{
               
             get_city += '<option value="'+getitems.city+'">'+getitems.city+'</option>';
               
           })
       res.json({get_city});
       })
                
                
                
    
}
exports.Mediaget = function(req,res){ 

 let SateQury = "select * from media";
  db.query(SateQury,(err,reultmedia)=>{
                
                  res.render('admin/posttest.ejs',{
        
       
           citylist:reultmedia,
    }) 
                
            })   
     

}
exports.blogget =function(req,res){
    let query = "SELECT * FROM `blog` ORDER BY ID ASC";
  db.query(query,(err,result) =>{


    if(err){
    return res.status(500).send(err);
    }

    res.render('admin/view-blog.ejs',{
     
      bloglist : result
    })
  });
}

exports.blogpost =function(req,res){
    if(!req.files){

  return res.status(400).send("data not found");
}

let message = '';

let b_title = req.body.btitle;
let s_title = req.body.stitle;
let b_author = req.body.bauthor;
let b_des = req.body.bdes;
let uploadedBfile = req.files.image;
let bimage = uploadedBfile.name;
uploadedBfile.mv(`public/images/${bimage}`,(err) => {

let usernamequery = "SELECT * FROM blog WHERE b_title ='"+ b_title +"'";
db.query(usernamequery,(err,result) =>{

  if(err){
    return res.status(500).send(err);
  }
  if(result.length > 0 ){
    message='Username already exists';
    res.render('admin/add-blog.ejs',{
      message,
    });
  }
  else{
let  query = "INSERT INTO blog (b_title,s_title,b_author,b_image,b_des) VALUES ('"+ b_title +"','"+ s_title +"','"+ b_author +"','"+ bimage +"','"+ b_des +"')" ;

db.query(query,(err,result2) => {
  if(err){

    return res.status(500).send(err);
  }
  res.redirect('/adminxp/add-blog');
 });
  }

})
 if (err) {
      return res.status(500).send(err);
  }});


}
exports.blogedit =function(req,res){
     let blogId = req.params.id;
  let query = "SELECT * FROM blog WHERE id = '"+blogId +"'";
  db.query(query,(err,result)=>{
    res.render('admin/edit-blog.ejs',{

 blogitem:result[0],
 message:'',
    })
  })
}

exports.blogupdate =function(req,res){
    let blogId = req.params.id;
let b_title = req.body.btitle;
let s_title = req.body.stitle;
let b_author = req.body.bauthor;
let b_des = req.body.bdes;
let uploadedBfile = req.files.image;
let bimage = uploadedBfile.name;
if(!req.files){
  
}

uploadedBfile.mv(`public/images/${bimage}`,(err) =>{
  if(err){
    return res.status(500).send(err);
  }
});
let query = "UPDATE blog SET b_title = '"+ b_title +"', s_title = '"+s_title+"',b_image = '"+ bimage +"', b_author = '"+b_author+"',b_des = '"+b_des +"' WHERE id = '"+ blodId+"'";
db.query(query,(err,result) =>{
  res.redirect('/add-blog');
})
}




//exports.Mediapost = function(req,res){
//    
//    
//    
//    if (!req.file) {
//        
//        console.log("No file received");
//         
//    
//      } else {
//        console.log('file received');
//        console.log(req);
//       let inserMedia = " INSERT INTO media (image_path) values ('"+mediaName+"')";
// 
//           db.query(inserMedia,(err,reultmedia)=>{
//                  console.log('inserted data');
//                res.json({reultmedia}) 
//                
//            })
//          
//     
// 
//      }
//    
//    
// 
//   // let mediafile = req.files.mediafile;
//
////    let mediaName = mediafile.name;
//    
//    
//     
//    
//
//           
//    
//    
//}



//AddNews  Controllers  End



