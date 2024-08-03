// ---------------------------------------
// handle navigation links in phone screen
// ---------------------------------------
let navBtnBurger = document.querySelector(".nav-phone")
let navToDisplay = document.querySelector(".header nav ul")
let searchFeild = document.querySelector(".header .search-feild")
let searchBtn = document.querySelector(".header .controls .search > i")
navBtnBurger.onclick = function () {
  navToDisplay.classList.toggle("current-screen")
  searchFeild.classList.remove("active-search")
}
searchBtn.onclick = function () {
  searchFeild.focus();
  searchFeild.classList.toggle("active-search")
  navToDisplay.classList.remove("current-screen")
}