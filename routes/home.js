var express = require('express');
var router = express.Router();
var fs = require('fs');
//const fileUpload = require('express-fileupload');

var homeController = require('../controller/front');
var UserController = require('../controller/user');
var resize  = require('../controller/image');
const { check, validationResult } = require('express-validator');
var resize  = require('../controller/image');
const multer = require('multer');

router.get('/images/post/:imagename',(req, res) => {
  // Extract the query-parameter
  const widthString = req.query.width
  const heightString = req.query.height
  const format = req.query.format
  const imagename=req.query.imagename
  const imagename2=req.params.imagename
  
  
  
  
console.log(imagename2);
  // Parse to integer if possible
  let width, height
  if (widthString) {
    width = parseInt(widthString)
  }
  if (heightString) {
    height = parseInt(heightString)
  }
  // Set the content-type of the response
  res.type(`image/${format || 'jpeg'}`)
  if(imagename2) { 
  // Get the resized image
  resize(`public/post/${imagename2}`, format, width, height).pipe(res);
  }
})
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/post')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.'+file.mimetype.split('/')[1])
  },
   
});

var upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'ads_media', maxCount: 8 }, { name: 'ads_logo', maxCount: 1 }]);


function logoutchk(req,res,next){
    if(req.session.loggedin){
        
          res.redirect('/');
        
        
        
    }
    else{
       return next();
    }
}
function loggedin(req,res,next){
    
    if(req.session.loggedin){
        
        return next();
        
        
    }
    
    else{
        
        
        res.redirect('/');
    }
}
router.get('/user/logout', function (req, res) {
 req.session.destroy();
 res.redirect('/');
});

router.get('/details',function(req,res){
    
           res.render('frontend/details.ejs',{
               
             req:req,  
           })
    
});
router.get('/404',function(req,res){
    
           res.render('frontend/404.ejs',{
               
             req:req,  
           })
    
});
router.get('/website',function(req,res){
    
           res.render('frontend/website.ejs',{
               
             req:req,  
           })
    
});
router.get('/listing',function(req,res){
    
           res.render('frontend/listing.ejs')
    
})
router.get('/team',function(req,res){
    
           res.render('frontend/team.ejs')
    
})

    


router.get('/user/login',function(req,res){


           res.render('frontend/user/login.ejs',{
               message:req.flash('info', 'Flash is back!')
               
                   

           })
    
})
router.get('/user/register',function(req,res){


           res.render('frontend/user/register.ejs',{
             
               
                   

           })
    
});

router.get('/business/:id/review',homeController.Reviews);
router.post('/business/:id/reviews',loggedin,[check('rating3').isLength({min:1}).withMessage('This Field is required'),check('reviewName').isLength({min:1}).withMessage('This Field is required'),check('review').isLength({min:1}).withMessage('Explain your rating')],homeController.ReviewsPost);



//Business Directory


router.get('/cost-compare',homeController.Costguide);
router.get('/cost-compare/:Dcategory',homeController.Costcompare);
router.get('/cost-compare/:location/:Dcategory',homeController.Costcompare);
router.post('/cost-search',homeController.Costsearch);

router.get('/directory',homeController.Directory);
router.get('/directory/:Dcategory',homeController.DirectoryList);
router.get('/directory/:location/:Dcategory',homeController.DirectoryList);
router.post('/professional-search',homeController.professionalsearch);


router.get('/getcities/:stateId',UserController.Getcities);
router.get('/',homeController.Homepost);
router.get('/getcityajax',UserController.Getcityajax);
router.get('/rating12/:businessid',homeController.ajaxrating);
router.get('/contactnow/:businessid',homeController.ajaxpopup);




router.get('/search/professionals',homeController.SearchboxList);
router.get('/search/aricles',homeController.PostList);
router.get('/search/design',homeController.DesignList);
router.get('/account/forgot-password/',homeController.forgotPass);
router.post('/account/forgot-password/',[check('email').isEmail().withMessage('Invalid Email Address')],homeController.forgotPost);



router.get('/sign-up',UserController.Homesignup);
router.get('/sign-in',logoutchk,UserController.Homeloginget);
router.post('/sign-in',logoutchk,[check('user_email').isLength({ min: 1 }).withMessage('This Field is required'),check('user_password').isLength({ min: 1 }).withMessage('This Field is required')],UserController.HomeLoginpost);

router.post('/sign-up',[check('user_name').isLength({ min: 1 }).withMessage('This Field is required'),check('user_email').isEmail().withMessage('Invalid Email Address'),check('user_password').isLength({ min: 1 }).withMessage('This Field is required')],UserController.NewpostRegister);

router.get('/contact-us',homeController.Contactget);
router.get('/product/listing',loggedin,UserController.forProduct);
router.get('/for-business',loggedin,UserController.forBusiness);
router.post('/user-message',[check('user_name').isLength({min:1}).withMessage('This field is required'),check('user_mobile').isLength({min:1}).withMessage('This field is required').isLength({max:10}).withMessage('Invalid phone number').isNumeric("Only number required").withMessage('Only number required'),check('user_message').isLength({min:1}).withMessage('This field is required')],homeController.userMessage);

//router.post('/for-business', cpUpload,[check('ads_contact').isLength({min:1}).withMessage('This field is required'),check('ads_mobile').isLength({min:1}).withMessage('This field is required'),check('ads_email').isEmail().withMessage('This field is required')],UserController.adnewPostB);
router.post('/product/listing', cpUpload,loggedin, [check('ads_contact').isLength({min:1}).withMessage('This field is required'),check('ads_mobile').isLength({min:1}).withMessage('This field is required').isLength({max:10}).withMessage('Invalid phone number').isNumeric("Only number required").withMessage('Only number required'),check('ads_email').isEmail().withMessage('Invalid email'),check('category').isLength({min:1}).withMessage('Please Select Category'),check('shopname').isLength({min:1}).withMessage('This field is required'),check('ads_title').isLength({min:1}).withMessage('This field is required').isLength({max:70}).withMessage('Title is very long'),check('ads_description').isLength({min:1}).withMessage('This Field is required'),check('ads_country').isLength({min:1}).withMessage('This field is required'),check('ads_state').isLength({min:1}).withMessage('This field is required'),check('ads_address').isLength({min:1}).withMessage('This field is required'),check('ads_price').isLength({min:1}).withMessage('This field is required'),check('ads_website').isLength({min:1}).withMessage('This field is required'),check('currency_id').isLength({min:1}).withMessage('This field is required')],UserController.adnewPostP);
router.post('/for-business', cpUpload,loggedin, [check('ads_contact').isLength({min:1}).withMessage('This field is required'),check('ads_mobile').isLength({min:1}).withMessage('This field is required').isLength({max:10}).withMessage('Invalid phone number').isNumeric("Only number required").withMessage('Only number required'),check('ads_email').isEmail().withMessage('Invalid email'),check('category').isLength({min:1}).withMessage('Please Select Category'),check('ads_title').isLength({min:1}).withMessage('This field is required').isLength({max:70}).withMessage('Title is very long'),check('ads_description').isLength({min:1}).withMessage('This Field is required'),check('ads_state').isLength({min:1}).withMessage('This field is required'),check('ads_address').isLength({min:1}).withMessage('This field is required')],UserController.adnewPostB);

router.get('/about-us',homeController.Aboutget);
router.get('/privacy-policy',homeController.Privacyget);
router.get('/terms-of-service',homeController.Termsget);
router.get('/directory/details/:id/:title',homeController.ProductDetails);
router.get('/post/:news_category/:id/:news_title',homeController.DetailPage);
router.get('/authors/:id/:username',homeController.Userprofile);
router.get('/designs/:Dcategory',homeController.designListfilter);
router.get('/designs',homeController.DesignList);
router.get('/designs/:id/:design_title',homeController.UserDesign);
router.get('/article/:category(architecture|decor|agriculture|technology|garden|art|business|travel|food|education|health|outdoors|home|entertainment|wellness|furniture)?',homeController.PostList);

 
router.post('/register',[check('user_name').isLength({ min: 1 }).withMessage('This Field is required'),check('user_email').isEmail().withMessage('Invalid Email').isLength({ min: 1 }).withMessage('This Field is required'),check('user_password').isLength({ min: 1 }).withMessage('This Field is required')],UserController.postRegister);
router.post('/login',UserController.PostLogin);

//router.get('/register',UserController.getRegister);



//Farming

router.get('/farming',homeController.Farming);
router.get('*',function(req,res){
           
res.redirect('/404')  })

module.exports = router;