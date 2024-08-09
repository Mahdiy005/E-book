// ---------------------------------------
// handle navigation links in phone screen
// ---------------------------------------
let navBtnBurger = document.querySelector(".nav-phone");
let navToDisplay = document.querySelector(".header nav ul");
let searchFeild = document.querySelector(".header .search-feild");
let searchBtn = document.querySelector(".header .controls .search > i");
let books = [];
let favBooks = [];

navBtnBurger.onclick = function () {
  navToDisplay.classList.toggle("current-screen");
  searchFeild.classList.remove("active-search");
};
searchBtn.onclick = function () {
  window.scrollTo({
    behavior: "smooth",
    top: document.querySelector("#products").offsetTop,
  });
  searchFeild.focus();
  searchFeild.classList.toggle("active-search");
  navToDisplay.classList.remove("current-screen");
};

// -----------------------------------------
// Handle if is there data in local storage
// -----------------------------------------
function handleLocalStorage() {
  if (window.localStorage.getItem("num_of_loved")) {
    let lovedIcon = document.querySelectorAll(".products .title > i");
    document.querySelector(".header button[data-quantity]").dataset.quantity =
      window.localStorage.getItem("num_of_loved");
    // document.querySelectorAll(".products .title > i")
    // set solid icon if loved
    JSON.parse(window.localStorage.getItem("books")).forEach((book, index) => {
      console.log(book.loved);
      if (book.loved) {
        // document.querySelectorAll(".products .title > i").classList.toggle("fa-regular");
        document
          .querySelectorAll(".products .title > i")
          [index].classList.add("fa-solid");
      }
    });
    // console.log(JSON.parse(window.localStorage.getItem("books")));
  }
}

// ---------------------------------------
// get data of books from json file to display
// ---------------------------------------
let dataBooks = fetch("books.json").then(async (data) => {
  // handle list favorit local storage
  listFavLocally();
  return await data.json();
});
dataBooks.then(async (data) => {
  books = await data;
  displayBooks(books);
  // loved icon
  lovedIconHandling(books);
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
                <button class="item-list-button">${data[i].tag.join(
                  " | "
                )}</button>
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
  handleLocalStorage();
  let lovedIcon = document.querySelectorAll(".products .title > i");
  lovedIcon.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      // add solid icon
      this.classList.toggle("fa-regular");
      this.classList.toggle("fa-solid");
      // edit number of loved in cart
      if (this.classList.contains("fa-solid")) {
        // cntLOved+=1;
        document.querySelector(".header button[data-quantity]").dataset
          .quantity++;
        // is loved true in json file
        data[index].loved = true;
        // add to favorits lets
        favBooks.push(data[index]);
      } else {
        document.querySelector(
          ".header button[data-quantity]"
        ).dataset.quantity -= 1;
        data[index].loved = false;
        console.log(favBooks);
        // favBooks = JSON.parse(favBooks);
        favBooks = favBooks.filter((e) => {
          // console.log(favBooks);
          return !(e.id === books[index].id);
        });
      }

      console.log(
        document.querySelector(".header button[data-quantity]").dataset.quantity
      );
      // store all array in local storage to reset loved value
      // -----Warning
      // ----> must writ books[] in json file befor storage it locally
      window.localStorage.setItem("books", JSON.stringify(books));
      // store if book the number of book is loved
      window.localStorage.setItem(
        "num_of_loved",
        document.querySelector(".header button[data-quantity]").dataset.quantity
      );
      // display when your first fav book
      // displaFav(favBooks) --> done
      displaFav(favBooks);
      // add favourits to local storage
      window.localStorage.setItem("fav_books", JSON.stringify(favBooks));
    });
  });
}

// -------------------
// handle show favorites book list
// -------------------
// ---> load favorits book here
let listFavourits = document.querySelector(".all-downloads");
let openList = document.querySelector(".header .controls .cart");
let btnClose = document.querySelector(".close");
let favoritsArea = document.querySelector(".all-downloads .contain");
btnClose.onclick = function () {
  listFavourits.style.right = "-1500px";
};
openList.onclick = function () {
  listFavourits.style.right = 0;
};

function displaFav(items) {
  favoritsArea.innerHTML = "";
  // console.log(favBooks); --> all is done
  for (let i = 0; i < items.length; i++) {
    let card = `
      <div class="card">
        <div class="container-img">
          <img src=${items[i].img} alt="">
        </div>
        <div class="right">
          <div class="info">
            <div class="title">${items[i].title}</div>
            <div class="tag">${items[i].tag.join(" | ")}</div>
            <div class="auther">${items[i].auther}</div>
          </div>
          <a class="button" href="${items[i].file}" download="${
      items[i].title
    }">Download</a>
        </div>
      </div>
  `;
    favoritsArea.innerHTML += card;
  }
}

function listFavLocally() {
  if (window.localStorage.getItem("fav_books")) {
    favBooks = JSON.parse(window.localStorage.getItem("fav_books"))
    displaFav(JSON.parse(window.localStorage.getItem("fav_books")));
  }
}
