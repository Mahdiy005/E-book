// ---------------------------------------
// handle navigation links in phone screen
// ---------------------------------------
let navBtnBurger = document.querySelector(".nav-phone")
let navToDisplay = document.querySelector(".header nav ul")
navBtnBurger.onclick = function () {
  navToDisplay.classList.toggle("current-screen")
}