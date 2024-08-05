// ---------------------------------------
// handle navigation links in phone screen
// ---------------------------------------
let navBtnBurger = document.querySelector(".nav-phone");
let navToDisplay = document.querySelector(".header nav ul");
let searchFeild = document.querySelector(".header .search-feild");
let searchBtn = document.querySelector(".header .controls .search > i");
navBtnBurger.onclick = function () {
  navToDisplay.classList.toggle("current-screen");
  searchFeild.classList.remove("active-search");
};
searchBtn.onclick = function () {
  searchFeild.focus();
  searchFeild.classList.toggle("active-search");
  navToDisplay.classList.remove("current-screen");
};

// ---------------------------------------
// get data of books from json file to display
// ---------------------------------------
let dataBooks = fetch("books.json").then((data) => {
  return data.json();
});
dataBooks.then((data) => {
  displayBooks(data);
  // loved icon
  lovedIconHandling(data);
});

function displayBooks(data) {
  for (let i = 0; i < data.length; i++) {
    let card = `
    <div class="card">
          <div class="image_container">
            <img class="image" src=${data[i].img} alt="">
          </div>
          <div class="title">
            <span>${data[i].title}</span>
            <i class="fa-regular fa-heart"></i>
          </div>
          <div class="size">
            <span>Tags</span>
            <ul class="list-tags">
              <li class="item-list">
                <button class="item-list-button">${data[i].tag[0]}</button>
              </li>
              <li class="item-list">
                <button class="item-list-button">${data[i].tag[1]}</button>
              </li>
            </ul>
          </div>
          <div class="action">
            <div class="auther">
              <span>${data[i].auther}</span>
            </div>
            <button class="cart-button">
              <a href="${data[i].file}" download="${data[i].title}">Download</a>
            </button>
          </div>
        </div>
    `;
    document.querySelector(".products .container").innerHTML += card;
  }
}

// when click on love icon
function lovedIconHandling(data) {
  let lovedIcon = document.querySelectorAll(".products .title > i");
  lovedIcon.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      // add solid icon
      this.classList.toggle("fa-regular");
      this.classList.toggle("fa-solid");
      // edit number of loved in cart
      console.log(this.classList.contains("fa-solid"));
      if (this.classList.contains("fa-solid")) {
        // cntLOved+=1;
        document.querySelector(
          ".header button[data-quantity]"
        ).dataset.quantity++;
      } else {
        document.querySelector(
          ".header button[data-quantity]"
        ).dataset.quantity -= 1;
      }
    });
  });
}
