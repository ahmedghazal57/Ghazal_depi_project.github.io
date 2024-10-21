// open &  close menu
var menu = document.querySelector("#menu");
function open_menu() {
  menu.classList.add("active");
}
function close_menu() {
  menu.classList.remove("active");
}

// scrolling up
let scrolling = document.querySelector(".up");
window.onscroll = function () {
  if (this.scrollY >= 900) {
    scrolling.classList.add("show");
  } else {
    scrolling.classList.remove("show");
  }
};
scrolling.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
// scrolling up ends

// section1-sliding-image
var indexValue = 0;
function slideShow() {
  setTimeout(slideShow, 2500);
  var x;
  const img = document.querySelectorAll(".section1-img");
  for (x = 0; x < img.length; x++) {
    img[x].style.display = "none";
  }
  indexValue++;
  if (indexValue > img.length) {
    indexValue = 1;
  }
  img[indexValue - 1].style.display = "block";
}
slideShow();
// section1 ends

// love-react
let heartIcons = document.querySelectorAll(".heart");
heartIcons.forEach(function (heartIcon) {
  heartIcon.addEventListener("click", function () {
    this.classList.toggle("active-heart");
  });
});
