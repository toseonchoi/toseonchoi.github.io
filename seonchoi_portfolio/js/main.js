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

// jshint ignore: start

//  hoverontouch.js
//  An alternative hover function on mobile devices.
//  Version 3.0 02/06/17
//
//  Created by Vinzenz Aubry on 19/04/16. 
//  Copyright 2017 Vinzenz Aubry. All rights reserved.
//  MIT Licensed
//


//#To Do
// [ ] mouse click triggered on ios / android works -> ios bug?
// [ ] Android no redraw on scroll


function HoverOnTouch() {
    this.init();
    this.addCss();
    this.rewriteLinks();
    this.touchEvents();
}



HoverOnTouch.prototype.init = function () {
    //gather all elements
    this.all_objects = document.getElementsByClassName('hoverontouch');

    //set variables
    this.pressTimer;
    this.longpress = false;
    this.scrollStartX = 0;
    this.scrollStartY = 0;
    this.multipleTouchAmount = 0;
    this.multiTouchGesture = false;
};

HoverOnTouch.prototype.addCss = function () {
     for (var i = 0; i < this.all_objects.length; i++) {
        var object = this.all_objects[i];
        //adding css for iphone ui elements. Only applies to hover on touch elements: iphone tap highlight / Iphone magnifiing glass / Menu on link longpress
        object.style.cssText = "-webkit-tap-highlight-color: rgba(0,0,0,0); -webkit-user-select: none; -webkit-touch-callout: none; "; 
        //removing pointerevents on images for android
        var imagesArray = object.getElementsByTagName('img');
        for (var k = 0; k < imagesArray.length; k++) {
            imagesArray[k].style.cssText = "pointer-events: none;"; 
        }
     }

};

HoverOnTouch.prototype.rewriteLinks = function () {
    //rewrite links to data-attributes
    for (var i = 0; i < this.all_objects.length; i++) {
        object = this.all_objects[i];
        if(object.tagName === 'A') {
                //only rewrite if link
            var link = object.getAttribute("href");
            if (link) {
                //only rewrite if not already done
                object.setAttribute('data-link', link);
                object.removeAttribute("href");

            };
        }   
    }
};

HoverOnTouch.prototype.touchEvents = function () {
    var self = this;

    //define event listeners
    this.handlerMouseenterHoverontouch = this.mouseenterHoverontouch.bind(this);
    this.handlerMouseeoutHoverontouch = this.mouseeoutHoverontouch.bind(this);
    this.handlerMouseupHoverontouch = this.mouseupHoverontouch.bind(this);

    this.handlerTouchstartHoverontouch = this.touchstartHoverontouch.bind(this);
    this.handlerTouchendHoverontouch = this.touchendHoverontouch.bind(this);


    for (var i = 0; i < this.all_objects.length; i++) {
        var object = this.all_objects[i];

        //loop through elements and look for gifs
        object.allImages = object.getElementsByTagName('img');
        object.gifs = this.filterGifs(object.allImages);

        //add event listeners
        object.addEventListener('mouseenter', this.handlerMouseenterHoverontouch);
        object.addEventListener('mouseout', this.handlerMouseeoutHoverontouch);
        object.addEventListener('mouseup', this.handlerMouseupHoverontouch);
        object.addEventListener('touchstart', this.handlerTouchstartHoverontouch);
        object.addEventListener('touchend', this.handlerTouchendHoverontouch);

    }
};

HoverOnTouch.prototype.mouseenterHoverontouch = function (e) {
    //go up dom and add class
    var object = this.getClosest(e.target, '.hoverontouch');
    //restart images if gif
    this.restartImagesIfGif(object.allImages);

    object.className += " hoverontouch--aktiv";
};

HoverOnTouch.prototype.mouseeoutHoverontouch = function (e) {
    //go up dom and remove class
    var object = this.getClosest(e.target, '.hoverontouch');
    object.classList.remove("hoverontouch--aktiv");
};

HoverOnTouch.prototype.mouseupHoverontouch = function (e) {
    //go up dom and remove class
    var object = this.getClosest(e.target, '.hoverontouch');
    object.classList.remove("hoverontouch--aktiv");
    if (object.getAttribute('data-link')) {
        // console.log("clicked mouse");
        alert("mouse click");
        var location = object.getAttribute('data-link');
        if (e.which === 1) {
            window.location.href=location;
        } else if (e.which >= 2) {
            //opens new tab on wheel + opens new tab on right click //can't open contextmenu unfortunately because a has no link
            var win = window.open(location, '_blank');
            // win.focus();
        };
        //console.log("run redirect"); 
    };
};


HoverOnTouch.prototype.touchstartHoverontouch = function (e) {
    //console.log("touchstart");

    this.multipleTouchAmount = this.multipleTouchAmount + 1;

    if (this.multipleTouchAmount > 1) {
        this.multiTouchGesture = true;
    }
    
    //go up dom and add class
    var object = this.getClosest(e.target, '.hoverontouch');
    //restart gifs
    this.restartGifs(object.gifs);

    object.className += " hoverontouch--aktiv";

    //get entry coordinates for scroll block (needs to go into changedTouches because of the handler)
    this.scrollStartX = e.changedTouches[0].pageX;
    this.scrollStartY = e.changedTouches[0].pageY;

    var self = this;
    //console.log("timer runs");
    this.pressTimer = window.setTimeout(function() { 
        //console.log("timer end, longpress detected");
        self.longpress = true;             
    },250);

    //can't prevent default click, as it would break scrolling. Passive eventlisteners are not fully working yet
    // e.stopPropagation();
    // e.preventDefault();
};  


HoverOnTouch.prototype.touchendHoverontouch = function (e) {
    // console.log("touchend");
    var object = this.getClosest(e.target, '.hoverontouch');
    object.classList.remove("hoverontouch--aktiv");
    clearTimeout(this.pressTimer);

    this.multipleTouchAmount = this.multipleTouchAmount - 1;

    if (!this.longpress && this.multiTouchGesture === false && this.multipleTouchAmount === 0) {
        //this is a click, so go to the data-link, but only if data link exists and not more scrolling than 10px
        // calculate Distance
        var XOriginal = this.scrollStartX;
        var XEnd = e.changedTouches[0].pageX;
        var distanceX = Math.abs(XOriginal - XEnd);

        var YEnd = e.changedTouches[0].pageY;
        var YOriginal = this.scrollStartY;
        var distanceY = Math.abs(YOriginal - YEnd);

        if (object.getAttribute('data-link') && distanceY <= 5 && distanceX <= 5) {
            var location = object.getAttribute('data-link');
            window.location.href=location;
        };
        
    } else {
        this.longpress = false;
    };

    //set back multiTouchGesture to false if multi touch end
    if (this.multipleTouchAmount === 0) {
        this.multiTouchGesture = false;
    };

    e.preventDefault();
    e.stopPropagation();
};

HoverOnTouch.prototype.destroy = function () {
    //remove listeners
    this.removeAllListeners();
    console.log("removed everything. Set Hoverontouch variable to null if you like");
};

HoverOnTouch.prototype.removeAllListeners = function () {
    for (var i = 0; i < this.all_objects.length; i++) {
        var object = this.all_objects[i];
        object.removeEventListener('mouseenter', this.handlerMouseenterHoverontouch);
        object.removeEventListener('mouseout', this.handlerMouseeoutHoverontouch);
        object.removeEventListener('touchstart', this.handlerTouchstartHoverontouch);
        object.removeEventListener('touchend', this.handlerTouchendHoverontouch);
    }
};

HoverOnTouch.prototype.reInitHoverOnTouch = function () {
    //remove listeners
    this.removeAllListeners();
    //regather all elements
    this.all_objects = document.getElementsByClassName('hoverontouch');
    //rewrite Links
    this.rewriteLinks();
    //add back touchevents
    this.touchEvents();
};


                                        // ===== Helper Functions ===== //
HoverOnTouch.prototype.filterGifs = function (imageArray) {
    var allGifs = [];
    for (var i = imageArray.length - 1; i >= 0; i--) {
        var fileExtension = imageArray[i].src.split('.').pop();
        if (fileExtension === "gif") {
            allGifs.push(imageArray[i]);
        }
    }
    return allGifs;
};

HoverOnTouch.prototype.restartGifs = function (imageArray) {
    for (var i = imageArray.length - 1; i >= 0; i--) { //only restarts on server (local: reloads)
        var img = imageArray[i];
        var imageUrl = img.src;
        img.src = "#/";
        img.src = imageUrl;
    }
};

/**
 * Get closest DOM element up the tree that contains a class, ID, or data attribute
 * @param  {Node} elem The base element
 * @param  {String} selector The class, id, data attribute, or tag to look for
 * @return {Node} Null if no match
 */
HoverOnTouch.prototype.getClosest = function (elem, selector) {
    var firstChar = selector.charAt(0);

    // Get closest match
    for ( ; elem && elem !== document; elem = elem.parentNode ) {

        // If selector is a class
        if ( firstChar === '.' ) {
            if ( elem.classList.contains( selector.substr(1) ) ) {
                return elem;
            }
        }

        // If selector is an ID
        if ( firstChar === '#' ) {
            if ( elem.id === selector.substr(1) ) {
                return elem;
            }
        } 

        // If selector is a data attribute
        if ( firstChar === '[' ) {
            if ( elem.hasAttribute( selector.substr(1, selector.length - 2) ) ) {
                return elem;
            }
        }

        // If selector is a tag
        if ( elem.tagName.toLowerCase() === selector ) {
            return elem;
        }

    }

    return false;
};


//  jshint ignore: end