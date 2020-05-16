var express = require('express');
var router = express.Router();
var UserController = require('../controller/user');
var fs = require('fs');
const { check, validationResult } = require('express-validator');
var imager = require('multer-imager');
const path = require('path')

const multer = require('multer');
const sharp = require('sharp')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/post')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.'+file.mimetype.split('/')[1])
  },
   
});


//var storage3 = new multer.diskStorage({
//        destination : path.resolve("public/user/article"),
//        filename : function(req, file, callback) {
//            callback(null, file.originalname)
//        }
//    })

var storage2 = multer.diskStorage({
  destination: function (req, file, cb2) {
    cb2(null, 'public/post')
  },
  filename: function (req, file, cb2) {
    cb2(null, file.fieldname + '-' + Date.now()+'.'+file.mimetype.split('/')[1])
  },
   
});

var storage3 = multer.diskStorage({
  destination: function (req, file, cb2) {
    cb2(null, 'public/post')
  },
  filename: function (req, file, cb2) {
    cb2(null, file.fieldname + '-' + Date.now()+'.'+file.mimetype.split('/')[1])
  },
   
});

var upload = multer({ storage: storage });
var upload2 = multer({storage:storage2 });
var upload3 = multer({storage:storage3 });

var cpUpload = upload.fields([{ name: 'ads_media', maxCount: 8 }, { name: 'ads_logo', maxCount: 1 }, { name: 'user_profile', maxCount: 1 }]);
var cpUpload3 = upload.fields([ { name: 'ads_logo', maxCount: 1 }]);
var testupload = upload2.fields([{ name: 'mediafile', maxCount:1 }]);
var cpUpload2 = upload.fields([{ name: 'mediafile', maxCount: 1 }]);
var profileupload = upload.fields([{ name: 'user_profile', maxCount: 1 }]);
var article = upload2.fields([{name:'author_image', maxCount: 1 },{ name:'ads_logo', maxCount: 1 }]);
//router.post('/demo',upload.array('photo', 12),function (req,res){
//    
//    res.send("fdfdfd")
//})
function loggedin(req,res,next){
    
    if(req.session.loggedin){
        
        return next();
        
        
    }
    
    else{
        
        
       res.redirect('/');
    }
}

router.get('/',loggedin,UserController.dashboard);
router.get('/dashboard',loggedin,UserController.dashboard);
router.get('/demo',function(req,res){


           res.render('frontend/user/demo.ejs',{
       
       

           })
    
});

router.get('/postads',function(req,res){


           res.render('frontend/user/post-ads.ejs',{
            
       
req:req,
           })
    
});


router.get('/post-event',function(req,res){


           res.render('frontend/user/post-event.ejs',{
       
       

           })
    
});
router.get('/designs',loggedin,UserController.ProductgetPost);

router.get('/share',loggedin,function(req,res){
               let id = req.session.userId;
               let ProfileShare = "select * from user_login where id = '"+id+"'";    
       db.query(ProfileShare,(err,ProfileShare)=>{
            res.render('frontend/user/share.ejs',{
        req:req,
       
ProfileShare:ProfileShare,
           }) 
           
       })
         
    
});
router.get('/post-event',function(req,res){


           res.render('frontend/user/post-event.ejs',{
        
       

           })
    
});
router.get('/followers',loggedin,function(req,res){


           res.render('frontend/user/follwer.ejs',{
        
       
req:req,
           })
    
})

router.get('/event',function(req,res){


           res.render('frontend/user/events.ejs',{
        
       

           })
    
})


router.get('/article',loggedin, UserController.getArticles);
router.get('/articledelete/:id',loggedin, UserController.Detelearticle);
router.get('/productdelete/:id',loggedin, UserController.Deteleproduct2);
router.get('/edit-article/:id',loggedin, UserController.articleEdit);

router.post('/edit-article/:id',loggedin,article,[check('title1').isLength({ min: 1 }).withMessage('This Field is required').isLength({ max: 100 }).withMessage('Maximum 100 chars long'),check('category').isLength({ min: 1 }).withMessage('This Field is required'),check('description').isLength({ min: 1 }).withMessage('This Field is required')],UserController.Updatetarticle);

router.post('/chagePssword',loggedin,[check('current_password').isLength({ min: 1 }).withMessage('This Field is required'),check('new_password').isLength({ min: 1 }).withMessage('This Field is required').isLength({max:6}).withMessage("password at least 6 Words")],UserController.chagePssword);

router.post('/profile_photo',loggedin,profileupload,UserController.chageProfile);
router.post('/cover_photo',loggedin,cpUpload,UserController.coverphoto);

router.get('/post-article',loggedin,UserController.Getarticle);



router.post('/post-article',loggedin,article, [check('title1').isLength({ min: 1 }).withMessage('This Field is required').isLength({ max: 100 }).withMessage('Maximum 100 chars long'),check('category').isLength({ min: 1 }).withMessage('This Field is required'),check('description').isLength({ min: 1 }).withMessage('This Field is required')],UserController.Postarticle );


router.get('/category/:parent_category',loggedin,UserController.Subcategory);

router.get('/bcategory/:parent_category',UserController.BSubcategory);
router.get('/Ccategory/:parent_category',UserController.CSubcategory);

router.get('/edit/:id',loggedin,UserController.editGetProfile);
router.post('/edit/:id',loggedin,UserController.postProfile);

router.get('/delete/:id',loggedin,UserController.Deletebusiness);

router.get('/mediadelete/:id',loggedin,UserController.Mediadelete);

router.get('/busniess-edit/:id',loggedin,UserController.Editbusiness);

router.get('/profile',loggedin,UserController.GetProfile);

router.get('/business',loggedin,UserController.Getbusiness);

router.get('/ads',loggedin,UserController.adgetPost);

router.post('/mediaUpload',testupload,UserController.Mediaupload)

router.post('/ads', cpUpload,loggedin, [check('ads_contact').isLength({min:1}).withMessage('This field is required'),check('ads_mobile').isLength({min:1}).withMessage('This field is required').isLength({max:10}).withMessage('Invalid phone number').isNumeric("Only number required").withMessage('Only number required'),check('ads_email').isEmail().withMessage('Invalid email'),check('category').isLength({min:1}).withMessage('Please Select Category'),check('ads_title').isLength({min:1}).withMessage('This field is required').isLength({max:70}).withMessage('Title is very long'),check('ads_description').isLength({min:1}).withMessage('This Field is required'),check('ads_state').isLength({min:1}).withMessage('This field is required'),check('ads_address').isLength({min:1}).withMessage('This field is required')],UserController.adnewbusiness);
//router.post('/demozz',testupload,loggedin,UserController.Mediaupload);

router.post('/busniess-edit/:id', cpUpload,loggedin, [check('ads_contact').isLength({min:1}).withMessage('This field is required'),check('ads_mobile').isLength({min:1}).withMessage('This field is required').isLength({max:10}).withMessage('Invalid phone number').isNumeric("Only number required").withMessage('Only number required'),check('ads_email').isEmail().withMessage('Invalid email'),check('category').isLength({min:1}).withMessage('Please Select Category'),check('ads_title').isLength({min:1}).withMessage('This field is required').isLength({max:100}).withMessage('Title is very long'),check('ads_description').isLength({min:1}).withMessage('This Field is required'),check('ads_state').isLength({min:1}).withMessage('This field is required'),check('ads_address').isLength({min:1}).withMessage('This field is required')],UserController.updateBusiness);

router.get('/edit-product/:id',loggedin, UserController.productEdit);
router.post('/edit-product/:id', cpUpload,loggedin, [check('category').isLength({min:1}).withMessage('Please Select Category'),check('companyname').isLength({min:1}).withMessage('This field is required'),check('ads_title').isLength({min:1}).withMessage('This field is required').isLength({max:70}).withMessage('Title is very long'),check('ads_description').isLength({min:1}).withMessage('This Field is required'),check('ads_state').isLength({min:1}).withMessage('This field is required')],UserController.productnewupdate);
router.get('/post-design',loggedin,UserController.GetProduct);

router.post('/post-design', cpUpload,loggedin, [check('category').isLength({min:1}).withMessage('Please Select Category'),check('companyname').isLength({min:1}).withMessage('This field is required'),check('ads_title').isLength({min:1}).withMessage('This field is required').isLength({max:70}).withMessage('Title is very long'),check('ads_description').isLength({min:1}).withMessage('This Field is required'),check('ads_state').isLength({min:1}).withMessage('This field is required')],UserController.productnewPost);



router.post('/post-pricing', cpUpload3,loggedin, [check('category').isLength({min:1}).withMessage('Please Select Category'),check('companyname').isLength({min:1}).withMessage('This field is required'),check('ads_state').isLength({min:1}).withMessage('This field is required'),check('ads_city').isLength({min:1}).withMessage('This field is required'),check('hourly').isNumeric("Only number required")],UserController.PricingbusinessPost);

router.post('/pricing-edit/:id', cpUpload3,loggedin, [check('category').isLength({min:1}).withMessage('Please Select Category'),check('companyname').isLength({min:1}).withMessage('This field is required'),check('ads_state').isLength({min:1}).withMessage('This field is required'),check('ads_city').isLength({min:1}).withMessage('This field is required')],UserController.getupdatepricing);

router.get('/pricing-edit/:id',loggedin,UserController.getEditpricing);
router.get('/pricingdelete/:id',loggedin,UserController.deletepricing);
router.get('/pricing',loggedin,UserController.Pricingbusiness);
router.get('/post-pricing',loggedin,UserController.PricingForm);
router.get('/message',loggedin,UserController.messageCon);




module.exports = router;