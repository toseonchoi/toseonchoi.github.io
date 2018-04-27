/*--HEADER-------------------------------------------------------------------------------------------------------*/




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
  var dots = document.getElementsByClassName("pagination_dot");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" pagination_dot_selected", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " pagination_dot_selected";
}

