var express = require('express');
var router = express.Router();
var fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');

var adminController = require('../controller/admin');
var resize  = require('../controller/image');

function loggedin1(req,res,next){
    
    if(req.session.adminlogin){
        
        return next();
        
        
    }
    
    else{
       
        
       res.redirect('/adminxp/login');
    }
}

var storage = multer.diskStorage({
    
    destination:function(req,file,cb){
        
        cb(null,'public/post')
      
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now()+'.'+file.mimetype.split('/')[1])
    }
});

var upload = multer({storage:storage})
  var newspic  = upload.fields([{name:'nimage',maxCount:1}])
  var cpUpload2 = upload.fields([{ name: 'mediafile', maxCount: 1 }]);
//add category router start 
router.get('/',adminController.Adminindex);
router.get('/add-category',adminController.Getcategory);
router.get('/view-category',adminController.Viewcategory);
router.get('/category-edit/:id',adminController.Editcategory)
router.get('/cateory-delete/:id',adminController.Deletecategory);
router.post('/add-category',adminController.Postcategory);

router.get('/add-bcat',adminController.BGetcategory);
router.get('/view-bcat',adminController.BViewcategory);
router.get('/category-bedit/:id',adminController.BEditcategory)
router.get('/cateory-bdelete/:id',adminController.BDeletecategory);
router.post('/add-bcat',adminController.BPostcategory);
router.get('/add-tag',adminController.Addtag);
router.get('/edit-tag/:id',adminController.Edittags);
router.post('/add-tag',adminController.Posttag);
router.post('/edit-tag/:id',adminController.Updatetag);
router.get('/delete-tag/:id',adminController.Deletetag);
router.get('/subcategory/:category',adminController.Getsubcategory);
router.post('/add-news',newspic,adminController.PostNews);
router.post('/news-edit/:id',newspic,adminController.updateNews);
router.get('/adminnews-delete/:id',adminController.deleteadminNews);
router.get('/usernews-delete/:id',adminController.deleteuserNews);
router.get('/news-deactive/:id/1',adminController.activeadminNews);
router.get('/news-deactive/:id/0',adminController.deactiveadminNews);
router.get('/business-edit/:id',adminController.Editbusiness);
router.post('/business-edit/:id',adminController.updatebusiness);
router.get('/business-delete/:id',adminController.deletebusiness);
router.get('/business-status/:id/1',adminController.activestatus);
router.get('/business-status/:id/0',adminController.deactivestatus);

router.get('/product-delete/:id',adminController.deleteproduct);
router.get('/product-status/:id/1',adminController.activestatusp);
router.get('/product-status/:id/0',adminController.deactivestatusp);
router.get('/user',adminController.userList);
router.get('/user-delete/:id',adminController.deleteuser);
router.get('/user-status/:id/1',adminController.activestatusu);
router.get('/user-status/:id/0',adminController.deactivestatusu);
//router.post('/mediapost',upload.single('mediafile'),adminController.Mediapost);


router.post('/mediapost', function (req, res) {
   let mediafile = req.files.mediafile;

    let mediaName = mediafile.name;
 if (!req.files) {
        
        console.log("No file received");
         
    
      } else {
        console.log('file received');
        console.log(req);
          
       let inserMedia = " INSERT INTO media (image_path) values ('"+ mediaName +"')";
 
           db.query(inserMedia,(err,reultmedia)=>{
                  console.log('inserted data');
                res.json({reultmedia}) 
                
            })
          
     
 
      }
});

router.get('/mediapost',adminController.Mediaget);
//add category router End 


//add News router start 
router.get('/add-news',adminController.Getnews);
router.get('/business',adminController.Getbusiness);
router.get('/product',adminController.GetProduct);
router.get('/admin-news',adminController.viewadminnews);
router.get('/user-news',adminController.viewusernews);
router.get('/get-city/:state',adminController.Getcity);


router.get('/news-edit/:id',adminController.newEdit)












router.get('/add-blog',function(req,res){ 

 res.render('admin/add-blog.ejs',{
   message:'',
 });


});

router.get('/view-blog',adminController.blogget)

router.get('/login',adminController.Login)
router.post('/login',adminController.Loginpost)
router.post('/add-blog',adminController.blogpost);




router.get('/edit-blog/:id',adminController.blogedit)


router.post('/edit-blog/:id',adminController.blogupdate);




//add News products
router.post('/product-edit/:id',newspic,adminController.UpdateProduct);

router.get('/add-product',adminController.Addproduct);
router.post('/add-product',newspic,adminController.PostProduct);

router.get('/product-edit/:id',adminController.Editproduct);


module.exports = router;
