/*--SMOOTH SCROLL-------------------------------------------------------------------------------------------------------*/

$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 100, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});


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
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('header_down').addClass('header_up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('header_up').addClass('header_down');
        }
    }
    
    lastScrollTop = st;
}


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


/*--RETURN TOP------------------------------------------------------------------------------------------------------*/


$(window).scroll(function(event){
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
        $(".return_top").addClass("show");
    } else {
        $(".return_top").removeClass("show");
    }
});
/*Animation anchor*/
$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 1000);
});


/*--TEST-------------------------------------------------------------------------------------------------------*/

// Add no-touch class to body for mobile touch events and toggle hover class on elements that need it
  if ("ontouchstart" in document.documentElement) {
    document.documentElement.className += " touch";
  }
  
  // Add and remove no-hover class to <li>'s for mobile hover events
  jQuery('.touch .container').each(function() {
    var div = jQuery(this);
    
    div.hover(function() {
      div.removeClass('no-hover');
    });
    
    jQuery('*').not(div).bind('click', function() {
      div.addClass('no-hover');
    });
    
  });