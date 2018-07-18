/*--HEADER UP & DOWN-------------------------------------------------------------------------------------------------------*/


var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    if (st > lastScrollTop && st > navbarHeight){

        $('header').removeClass('header_down').addClass('header_up');
    } else {

        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('header_up').addClass('header_down');
        }
    }
    
    lastScrollTop = st;
}


/*--RETURN TOP------------------------------------------------------------------------------------------------------*/


$(window).scroll(function(event){
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
        $(".return_top").addClass("show");
    } else {
        $(".return_top").removeClass("show");
    }
});


/*--HAMBURGER MENU-------------------------------------------------------------------------------------------------------*/


var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

var hamburgers = document.querySelectorAll(".hamburger");
if (hamburgers.length > 0) {
  forEach(hamburgers, function(hamburger) {
    hamburger.addEventListener("click", function() {
      this.classList.toggle("is-active");
    }, false);
  });
}


/*--GALLERY-------------------------------------------------------------------------------------------------------*/


var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("gallery_image");
  var dots = document.getElementsByClassName("slide_dot");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" slide_dot_selected", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " slide_dot_selected";
}


/*--SLIDE-------------------------------------------------------------------------------------------------------*/


/*--MOBILE HOVER-------------------------------------------------------------------------------------------------------*/


+$('body').bind('touchstart', function() {});

+document.addEventListener("touchstart", function(){}, true); 


/*--SMOOTH SCROLL-------------------------------------------------------------------------------------------------------*/


$(document).ready(function(){

  $("a").on('click', function(event) {


    if (this.hash !== "") {

      event.preventDefault();


      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 500, function(){
   
        window.location.hash = hash;
      });
    }
  });
});


/*--TEST-------------------------------------------------------------------------------------------------------*/
