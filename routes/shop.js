var express = require('express');
var router = express.Router();

//const fileUpload = require('express-fileupload');

var homeController = require('../controller/front');
var UserController = require('../controller/user');
var ShopController = require('../controller/shop');
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

router.get('/',ShopController.ShopIndex);
router.get('/:productcategory(furniture|outdoor|lighting|home-decor|kitchen-dining|bathroom|living|bedroom|plants|seeds|soil-fertilizer|pots-planters)?',ShopController.ShopList);



module.exports = router;