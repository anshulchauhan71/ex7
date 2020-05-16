
$(document).ready(function(){
$('#readmoreabout').click(function(){
    
    $(".slide-toggle").toggleClass("autoheight");
    $(".mask--gradient").toggle();
    var findtext = $("#readmoreabout span").text();
    $("#readmoreabout i").toggleClass("fa-angle-down fa-angle-up");

    if(findtext === "Read more"){
     $("#readmoreabout span").text("Read less");   
      
    }
    else {
          $("#readmoreabout span").text("Read more");  
    }
    
    
    
    
})




$('#user_button').toggle(function () {
    $("#user_button").css({borderBottomLeftRadius: "0px"});
}, function () {
    $("#user_button").css({borderBottomLeftRadius: "5px"});
});


$("#HomeSearch").click(function(){
   
    $("#SearchM").modal('show');
});
    $("#profileSearch").click(function(){
    
    $("#SearchM2").modal('show');
})
       $("#signinbtn").click(function(){
           
        $("#login_api").modal("hide");
           $("#register_api").modal("show");
           $("body").addClass("modal-open");
       });
        $("#loginbtn").click(function(){
           
           $("#register_api").modal("hide");
           $("#login_api").modal("show");
       });
       $(".sharebtn").click(function(){
           
           $(this).parent(".sharelink").find(".ArticleShare").toggle();
           
       })
      
    
    
    $(".LoginShows").click(function(){
    
    $(".LoginSignUpmob").toggle();
         $(this).html($(this).html() == '<svg id="v2-icon-avatar" viewBox="0 0 32 32"><title>avatar</title><path d="M16.133 1.8c-5.794-0.003-11.007 3.517-13.17 8.892s-0.839 11.525 3.343 15.535c0.087 0.147 0.217 0.263 0.373 0.333 4.713 4.216 11.648 4.804 17.004 1.441s7.838-9.866 6.087-15.942c-1.751-6.077-7.313-10.261-13.637-10.258zM8.133 25.52c0.8-2.327 2.954-3.918 5.413-4h5.253c2.456 0.084 4.605 1.675 5.4 4-4.624 3.89-11.376 3.89-16 0h-0.067zM25.533 24.187c-1.23-2.618-3.841-4.309-6.733-4.36h-5.293c-2.896 0.050-5.51 1.748-6.733 4.373-4.435-5.008-4.127-12.623 0.698-17.256s12.446-4.633 17.271 0c4.825 4.633 5.133 12.249 0.698 17.256l0.093-0.013zM16.16 7.693c-3.069 0-5.561 2.482-5.573 5.551s2.46 5.571 5.529 5.595c3.069 0.024 5.581-2.437 5.617-5.506 0.018-1.49-0.561-2.924-1.609-3.984s-2.475-1.656-3.965-1.656zM16.16 17.107c-1.559-0-2.963-0.943-3.554-2.386s-0.249-3.1 0.863-4.193c1.112-1.093 2.775-1.405 4.207-0.789s2.351 2.036 2.324 3.595c-0.036 2.095-1.745 3.774-3.84 3.773z"></path></svg>' ? '<svg id="v2-icon-close" viewBox="0 0 32 32"><path d="M17.279 16l10.457-10.46c0.352-0.352 0.352-0.924 0-1.276s-0.924-0.352-1.276 0l-10.471 10.46-10.443-10.46c-0.355-0.345-0.921-0.345-1.276 0-0.173 0.167-0.27 0.398-0.27 0.638s0.098 0.471 0.27 0.638l10.457 10.46-10.457 10.46c-0.173 0.167-0.27 0.398-0.27 0.638s0.098 0.471 0.27 0.638c0.167 0.173 0.398 0.269 0.638 0.264 0.239 0 0.469-0.095 0.638-0.264l10.443-10.46 10.457 10.46c0.166 0.173 0.398 0.269 0.638 0.264 0.239 0 0.469-0.095 0.638-0.264 0.345-0.355 0.345-0.921 0-1.276l-10.443-10.46z"></path></svg>' : '<svg id="v2-icon-avatar" viewBox="0 0 32 32"><title>avatar</title><path d="M16.133 1.8c-5.794-0.003-11.007 3.517-13.17 8.892s-0.839 11.525 3.343 15.535c0.087 0.147 0.217 0.263 0.373 0.333 4.713 4.216 11.648 4.804 17.004 1.441s7.838-9.866 6.087-15.942c-1.751-6.077-7.313-10.261-13.637-10.258zM8.133 25.52c0.8-2.327 2.954-3.918 5.413-4h5.253c2.456 0.084 4.605 1.675 5.4 4-4.624 3.89-11.376 3.89-16 0h-0.067zM25.533 24.187c-1.23-2.618-3.841-4.309-6.733-4.36h-5.293c-2.896 0.050-5.51 1.748-6.733 4.373-4.435-5.008-4.127-12.623 0.698-17.256s12.446-4.633 17.271 0c4.825 4.633 5.133 12.249 0.698 17.256l0.093-0.013zM16.16 7.693c-3.069 0-5.561 2.482-5.573 5.551s2.46 5.571 5.529 5.595c3.069 0.024 5.581-2.437 5.617-5.506 0.018-1.49-0.561-2.924-1.609-3.984s-2.475-1.656-3.965-1.656zM16.16 17.107c-1.559-0-2.963-0.943-3.554-2.386s-0.249-3.1 0.863-4.193c1.112-1.093 2.775-1.405 4.207-0.789s2.351 2.036 2.324 3.595c-0.036 2.095-1.745 3.774-3.84 3.773z"></path></svg>');
    
});
    

    
     $(".userCklogin").click(function(){
    
    $(".chkLogleftbar,.MenuOverlay2").show();
    
});
     $(".SideMobileclose2").click(function(){
    
    $(".chkLogleftbar,.MenuOverlay2").hide();
    
});
    
     $(".MenuOverlay2").click(function(){
    
    $(".chkLogleftbar,.MenuOverlay2").hide();
    
});
    
    
    $(".dropdownMob").click(function(){
    
    $(this).find(".megamenu").toggle();
    
});
    $(".baricon").click(function(){
    
    $(".MobileSidebar,.MenuOverlay").show();
    
});
     $(".SideMobileclose").click(function(){
    
    $(".MobileSidebar,.MenuOverlay").hide();
    
});
    
     $(".MenuOverlay").click(function(){
    
    $(".MobileSidebar,.MenuOverlay").hide();
    
});
    


       
       $('input[name="reviewName"]').keypress(function(){
           $("#reviewName").text("");
       });
    $('input[name="rating3"]').click(function(){ 
       if($('input[name="rating3"]').is(':checked')) {   $("#rating3").text(""); }

      })
     $('textarea[name="review"]').keypress(function(){
           $("#review").text("");
       });
    
    
    $('#GetListingdddd').submit(function(event) {
    event.preventDefault();
        
        var getLocationV = $("#locationgets").val();
        var getCategoryV = $("#categorygets").val();
        var replacesting = getCategoryV.replace(/ /g,"-");
    var replacesting2 = replacesting.replace(/&/g,"and");
        
        $.ajax({
            
            type:'POST',
            dataType: "html",

            data: $(this).serialize(),
          
               
            complete :function(GetListingdata){
              
                if(replacesting2 == '')
               {
                        window.location.reload(true);

               }
                else if(getLocationV == ''){
                        window.location='/directory/'+replacesting2;
                        }
                else {
                    window.location='/directory/'+getLocationV+'/'+replacesting2;
                }
                
            }
        })
    });
    setTimeout(function(){ $('#HideA').hide()}, 2000);
    setTimeout(function(){ $('.ShowA').show()}, 2000);
     $('#GetListingpricess').submit(function(event) {
    event.preventDefault();
        
        var getLocationV = $("#locationgets").val();
        var getCategoryV = $("#categorygets").val();
        var getPincode = $("#pincode").val();
        var GetNewLocation=(getLocationV !='')?'/'+getLocationV:''; 
        var replacesting = getCategoryV.replace(/ /g,"-");
    var replacesting2 = replacesting.replace(/&/g,"and");
        
        $.ajax({
            
            type:'POST',
                  dataType: "html",
            data: $(this).serialize(),
             complete :function(GetListingdata){
              
                if(getPincode == null && getLocationV == null)
               {
                        alert("duhsdu");

               }
                else if(getLocationV !== null && getPincode !== null){
                        window.location='/cost-compare/'+getCategoryV;
                    alert("duhsdddddddu");
                        }
                    else {
                    window.location='/cost-compare/'+getCategoryV;
                        alert(getLocationV)
                }
                
            }
        
        })
    });
    
    
    
    $('#messageForm').submit(function(event){
        
                   event.preventDefault();
        $.ajax({
            
            type:'POST',
            url:'/user-message',
            data:$('#messageForm').serialize(),
            success:function(sucessmessage){
            
            if(sucessmessage.errors){
                
                $.each(sucessmessage.errors,function(errormsg,error){
                    
                  
                                     $('#'+error.param).html(error.msg);

                })
            }
                else if(sucessmessage.Fmessage){
                    
                    $("#fmailmsg").html(sucessmessage.Fmessage)
                }
                else{
                    $("#sucessmsg").html(sucessmessage.Smessage)
                    window.location.reload();
                }
                    
                
        }
        })

    })
    
      $('#registerform').submit(function(event) {
           event.preventDefault();
       $.ajax({
           
           type:'POST',
           url:'/register',
           data: $('#registerform').serialize(),
           
           
           success:function(registersubmit){
               if(registersubmit.errors || registersubmit.message ){
                   
                    
               $.each(registersubmit.errors,function(errormsg,error){
                  
                   console.log(error);
                 
                  $('#'+error.param).html(error.msg);
                 // $("#user_password").html(errorsList)
                   
              })
                   $('#user_email,#user_mobile').html(registersubmit.message);
                 
               }
               else if(registersubmit.message2){
                   alert(registersubmit.message2)
               }
               else{
                   
                     window.location.reload();
               }
               
           }
           
           
       })
       
       
       });
        $('#loginform').submit(function(event) {
           event.preventDefault();
       $.ajax({
           
           type:'POST',
           url:'/login',
           data: $('#loginform').serialize(),
           
           
           success:function(loginsubmit){
             
               
               if(loginsubmit.errmessage || loginsubmit.wrongdetails){
                   
                   
                   $('#user_passwordlogin').text(loginsubmit.errmessage);
                   $('#user_mobilelogin').text(loginsubmit.wrongdetails);
               }
           
               else{
                   
                   $("#myModal").modal('hide');
                   
                   
                //window.location='/user/dashboard';
                  window.location.reload();  
                   
               }
           }
           
           
       })
       
       
       });
    
    $("#bcategory").change(function(){
        
        var get_value = $(this).val();
        $.ajax({
            type:'GET',
            url:'/user/bcategory/'+get_value,
            success:function(subcategory){
              $("#bsubcategory").html(subcategory.Catevalue)  
                
            }
        })
    })
    

  
    
    
      $("#add_services").click(function(){
    var serviceAppend = $("#serviceAppend").val();
            if(serviceAppend==''){
            $("#servicesAerr").text("Please Enter Service.")
            }
          else{
              
              $("#services").append("<label class='serviceBox'> <input type='checkbox' name='service[]' value='"+serviceAppend+"' checked> "+serviceAppend+"</label>");

          $('#serviceAppend').val('');
               $("#servicesAerr").text('');
          }

  });
    
    $("#ads_countryname").change(function(){
        
        var get_datavalue = $(this).find(':selected').attr('data-id');
    
        $.ajax({
            
            type:'GET',
            url:'/getcountries/'+get_datavalue,
            success:function(getStates){
                
           $("#ads_statename").html(getStates.get_city)  

                
            }
        })

    });
    
    $("#ads_statename").change(function(){
        
      var get_datavalue = $(this).val();
        $.ajax({
            
            type:'GET',
            url:'/getcities/'+get_datavalue,
            success:function(getStates){
                
           $("#ads_cityname").html(getStates.get_city)  

                
            }
        })

    })
       $(window).scroll(function(){
           
           
           if($(this).scrollTop()>50){
               $(".sidebar").addClass("sidefix");
               $(".desktop-header").addClass("headfix");
               $(".mobile_header").addClass("headfix");
           }
           else{
               
              $(".sidebar").removeClass("sidefix");
               $(".desktop-header").removeClass("headfix");  
               $(".mobile_header").removeClass("headfix");  
           }
           
       })
       $(".user_loginprofile").click(function(){
           
           
           $(".userlogin-nav").toggle();
       })
     
  
    $('#myCarousel').owlCarousel({
    loop:true,
    margin:20,stagePadding: 150,
              navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
            dots:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,   margin:10,
            nav:true,stagePadding: 10,
        },
        600:{
            items:2, margin:10,
            nav:true,stagePadding: 10,
        },
        1000:{
            items:1,
            nav:true,
            loop:true
        }
    }
});
    $('#tabs').owlCarousel({
    loop:true,
    margin:5,stagePadding: 0,
              navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
            dots:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:5,
            nav:true,
            loop:true
        }
    }
}); 
     $('#tabs1').owlCarousel({
    loop:true,
    margin:5,stagePadding: 0,
              navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
            dots:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:5,
            nav:true,
            loop:true
        }
    }
});   $('#tabs2').owlCarousel({
    loop:true,
    margin:5,stagePadding: 0,
              navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
            dots:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:5,
            nav:true,
            loop:true
        }
    }
});  $('#tabs3').owlCarousel({
    loop:true,
    margin:5,stagePadding: 0,
              navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
            dots:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:5,
            nav:true,
            loop:true
        }
    }
});  $('#tabs4').owlCarousel({
    loop:true,
    margin:5,stagePadding: 0,
              navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
            dots:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:5,
            nav:true,
            loop:true
        }
    }
});  $('#tabs5').owlCarousel({
    loop:true,
    margin:5,stagePadding: 0,
              navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
            dots:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:5,
            nav:true,
            loop:true
        }
    }
}); 
    
    
          function initialize() {
  var input = document.getElementById('searchTextField');
  new google.maps.places.Autocomplete(input);
}
    

google.maps.event.addDomListener(window, 'load', initialize);
const observer = lozad();
observer.observe(); })


$(document).ready(function(){ 

     $(".contactnow").click(function(){
        
         var getvlueid = $(this).attr('data-id');
       $.ajax({ 
           type:'GET',
           url:'/contactnow/'+getvlueid,
           dataType:"json",
           success:function(getData){
               $(".titleAajx").text(getData.title);
               $(".locationAajx").text(getData.city+','+getData.state);
               $(".userId").val(getData.id);
               if(getData.logo){
                   $(".contactlogo").attr('src','/images/post/'+getData.logo+'?width=45&height=45');
             
               }
              
                              
setTimeout(function(){
    
                $("#enqueryM").modal('show');
},200);
               
           }
       
       })
         
     })

});
 $(".DB-packlist").click(function(){
          
         
          
      });

  $(document).ready(function(){
    
        var get_valuea = [];
      
       var DBlist = $(".DBlist");
         
          
      for (var input = 1; input < DBlist.length+1; input++) {

         var pget_valuea = $("#atagetid_de"+input).val();
       
      
            get_valuea.push(pget_valuea);   
          
           
           
      }
      
           
      for (var i = 0; i < get_valuea.length; i++){
          
          var htmlsend = ("#datagetid_"+get_valuea[i]+" .rating_count")
          
        $.ajax({
            type:'GET',
            url:'/rating12/'+get_valuea[i],
            success:function(getdataalert){
                if(getdataalert.ratingacount) {
                       $("#ratings"+getdataalert.businessid).addClass(getdataalert.class)
              $("#count"+getdataalert.businessid).html(getdataalert.ratingacount+' Reviews');
                }
                else{
                
                    $("#count"+getdataalert.businessid).html('<a href="/business/'+getdataalert.businessid+'/review">Write a Review</a>');
                }
                
            }
        })  
      }
        
      
       
    
    })
    
$(document).ready(function(){
    
        var pget_valueas = $("#atagetid_de").val();
       
          
        $.ajax({
            type:'GET',
            url:'/rating12/'+pget_valueas,
            success:function(getdataalert){
                if(getdataalert.ratingacount) {
                       $("#ratings51").addClass(getdataalert.class)
              $("#count51").html(getdataalert.ratingacount+' Reviews');
                }
                else{
                
                    $("#count51").html('<a href="/business/'+getdataalert.businessid+'/review">Write a Review</a>');
                }
                
            }
        })  
     
        
      
       
    
    })
    
 $("#mastersearch").click(function(){
          
         
          
      });

function autocomplete2(inp, arr,arr2,arr3) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b,c,d, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
         b.innerHTML = "<a href='/search/design?q="+arr[i]+"' class='AllSrchlink'><span class='colrhe'>" + arr[i].substr(0, val.length) +  "</span>"+arr[i].substr(val.length)+" <span class='CategorySrcr'>Designs</span></a>";
            
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
       for (i = 0; i < arr2.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr2[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          c = document.createElement("DIV");
            
          c.innerHTML = "<a href='/search/professionals?q="+arr2[i]+"' class='AllSrchlink'><span class='colrhe'>" + arr2[i].substr(0, val.length) +  "</span>"+arr2[i].substr(val.length)+" <span class='CategorySrcr'>Professionals</span></a>";
            
            
        
          c.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(c);
        }
      }
         for (i = 0; i < arr3.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr3[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          d = document.createElement("DIV");
            
          d.innerHTML = "<a href='/search/aricles?q="+arr3[i]+"' class='AllSrchlink'><span class='colrhe'>" + arr3[i].substr(0, val.length) +  "</span>"+arr3[i].substr(val.length)+" <span class='CategorySrcr'>Articles</span></a>";
            
            
        
          d.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(d);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("focus", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].focus();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}


var photos = ["Bedroom","Cladding Designs","Dining Room","Outdoor","Office Designs","Door Design","Home Designs","Kitchen Designs","Bathroom Designs","Living Room","Tile Designs","Window Design","Railing Designs"];
var professinal = ["Appliances","Arborists & Tree Services","Architects","Artists & Artisans","Bathroom Designers & Renovators","Bedding & Bath","Blacksmiths & Welders","Building Designers","Building Supplies","Carpenters","Carpet & Upholstery Cleaners","Carpet Suppliers","Civil Engineers & Contractors","Cladding & Exteriors","Decks, Patios & Outdoor Structures","Doors","Driveways & Paving","Electricians","Environmental & Restoration Services","Fencing & Gates","Flooring Installers ","Furniture & Accessories","Glass, Mirrors & Shower Doors","Hardwood Flooring Suppliers","Home Automation & Home Media","Home Stylists & Property Staging","House Cleaning Services","Interior Designers & Decorators","Kitchen & Bathroom Fixtures","Kitchen Designers & Renovators","Landscape Architects & Designers","Landscape Contractors","Lawn & Gardeners Services","Lighting","Painting & Wallpaper","Plywood & Boards","Solar Panel Installation","Tile, Stone & Countertops","Window Sales & Installation"];
var article =["architecture","decor","agriculture","technology","garden","art","business","health","outdoors","home","furniture","education","architecture","furniture","wellness","garden","food"];

   


autocomplete2(document.getElementById("mastersearch"), photos,professinal,article);
autocomplete2(document.getElementById("HomeSearchall"), photos,professinal,article);

  !function(window){
  var $q = function(q, res){
        if (document.querySelectorAll) {
          res = document.querySelectorAll(q);
        } else {
          var d=document
            , a=d.styleSheets[0] || d.createStyleSheet();
          a.addRule(q,'f:b');
          for(var l=d.all,b=0,c=[],f=l.length;b<f;b++)
            l[b].currentStyle.f && c.push(l[b]);

          a.removeRule(0);
          res = c;
        }
        return res;
      }
    , addEventListener = function(evt, fn){
        window.addEventListener
          ? this.addEventListener(evt, fn, false)
          : (window.attachEvent)
            ? this.attachEvent('on' + evt, fn)
            : this['on' + evt] = fn;
      }
    , _has = function(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
      }
    ;

  function loadImage (el, fn) {
    var img = new Image()
      , src = el.getAttribute('data-src');
    img.onload = function() {
      if (!! el.parent)
        el.parent.replaceChild(img, el)
      else
        el.src = src;

      fn? fn() : null;
    }
    img.src = src;
  }

  function elementInViewport(el) {
    var rect = el.getBoundingClientRect()

    return (
       rect.top    >= 0
    && rect.left   >= 0
    && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    )
  }

    var images = new Array()
      , query = $q('img.lazy')
      , processScroll = function(){
          for (var i = 0; i < images.length; i++) {
            if (elementInViewport(images[i])) {
              loadImage(images[i], function () {
                images.splice(i, i);
              });
            }
          };
        }
      ;
    // Array.prototype.slice.call is not callable under our lovely IE8 
    for (var i = 0; i < query.length; i++) {
      images.push(query[i]);
    };

    processScroll();
    addEventListener('scroll',processScroll);

}(this);