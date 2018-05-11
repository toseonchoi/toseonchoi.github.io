/*--SMOOTH SCROLL-------------------------------------------------------------------------------------------------------*/


// $(document).ready(function(){
//   // Add smooth scrolling to all links
//   $("a").on('click', function(event) {

//     // Make sure this.hash has a value before overriding default behavior
//     if (this.hash !== "") {
//       // Prevent default anchor click behavior
//       event.preventDefault();

//       // Store hash
//       var hash = this.hash;

//       // Using jQuery's animate() method to add smooth page scroll
//       // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
//       $('html, body').animate({
//         scrollTop: $(hash).offset().top
//       }, 500, function(){
   
//         // Add hash (#) to URL when done scrolling (default click behavior)
//         window.location.hash = hash;
//       });
//     } // End if
//   });
// });


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


/*--MOBILE HOVER-------------------------------------------------------------------------------------------------------*/


+$('body').bind('touchstart', function() {});

+document.addEventListener("touchstart", function(){}, true); 


/*--TEST-------------------------------------------------------------------------------------------------------*/


(function() // Code in a function to create an isolate scope
{
var speed = 500;
var moving_frequency = 15; // Affects performance !
var links = document.getElementsByTagName('a');
var href;
for(var i=0; i<links.length; i++)
{   
    href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
    if(href !== null && href.length > 1 && href.substr(0, 1) == '#')
    {
        links[i].onclick = function()
        {
            var element;
            var href = this.attributes.href.nodeValue.toString();
            if(element = document.getElementById(href.substr(1)))
            {
                var hop_count = speed/moving_frequency
                var getScrollTopDocumentAtBegin = getScrollTopDocument();
                var gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;

                for(var i = 1; i <= hop_count; i++)
                {
                    (function()
                    {
                        var hop_top_position = gap*i;
                        setTimeout(function(){  window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency*i);
                    })();
                }
            }

            return false;
        };
    }
}

var getScrollTopElement =  function (e)
{
    var top = 0;

    while (e.offsetParent != undefined && e.offsetParent != null)
    {
        top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
        e = e.offsetParent;
    }

    return top;
};

var getScrollTopDocument = function()
{
    return document.documentElement.scrollTop + document.body.scrollTop;
};
})();