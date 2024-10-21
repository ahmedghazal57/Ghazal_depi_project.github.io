// open &  close menu
var menu = document.querySelector("#menu");
function open_menu() {
  menu.classList.add("active");
}
function close_menu() {
  menu.classList.remove("active");
}

var all_products_details;
let products_details = [];
let product_Js = document.querySelector(".product_section");

window.onload = function () {
  getCartItems();
  const productId = sessionStorage.getItem("selectedProductId");
  if (productId) {
    set_details(productId);
  } else {
    console.error("No product ID found in sessionStorage.");
  }
};

function set_details(id) {
  console.log(id);
  products_details = all_products_details[id];
  if (products_details) {
    console.log(products_details.img);
    product_Js.innerHTML += `
      <div class="container pb-lg-5">
        <div class="row pt-3" style="margin-top: 220px;" >
          <div class="col product_imagee d-flex justify-content-center align-items-center">
            <a href="${products_details.img}" data-lightbox="models">
              <img id="bag_img" src="${products_details.img}" />
            </a>
          </div>
          <div class="product_details col d-flex flex-column gap-2">
            <p class="h2 m-0 text-capitalize">${products_details.name}</p>
            <p class="h1 m-0">$${products_details.price}</p>
            <div class="d-flex product_stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
            <p class="h3 m-0">Product details:</p>
            <p class="m-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              aperiam aut laboriosam qui ea, quam impedit officiis dignissimos
              odio possimus autem reiciendis quasi, error voluptate ratione
              perspiciatis facilis iste? Labore.
            </p>
            <p class="h3 m-0 mb-1">select size:</p>
            <div class="product_sizes d-flex gap-3 mb-2">
              <button class="btn text-capitalize size" type="button">sm</button>
              <button class="btn text-capitalize size" type="button">md</button>
              <button class="btn text-capitalize size" type="button">lg</button>
            </div>
            <button class="btn col-lg-6 text-capitalize add_cart" type="button" id="add_cart" onclick="addToCard(${products_details.id}, this)">
              add to cart
            </button>
            <button class="btn col-lg-6 text-capitalize add_cart buy_now_button" type="button" id="buy_now_button">
              buy now
            </button>
            <button class="btn col-lg-6 text-capitalize add_cart" type="button" id="cart_page_button">
              cart page
            </button>
          </div>
        </div>
      </div>
    `;

    // Now that the elements are added, select and add event listeners
    // making buttons active if clicked

    let sizeButtons = document.querySelectorAll(".size");
    sizeButtons.forEach((btnEl) => {
      btnEl.addEventListener("click", () => {
        document.querySelector(".special")?.classList.remove("special");
        btnEl.classList.add("special");
      });
    });

    //add to cart button in the product page
    let addCartButton = document.getElementById("add_cart");
    addCartButton.addEventListener("click", () => {
      addCartButton.classList.remove("active");
        addCartButton.classList.add("special2");
        addCartButton.innerHTML = "Added to cart";
      
    });

    // buy now button opens buy div
    let buy_now_buttons = document.querySelectorAll(".buy_now_button");
    buy_now_buttons.forEach((button) => {
      button.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        document.querySelectorAll(".buy_now").forEach((element) => {
          element.classList.remove("d-none");
          element.classList.add("d-flex");
        });
      });
    });

    // hiding the buy_now div when clicking away
    document.addEventListener("click", function (event) {
      const buy_now = document.getElementById("buy_now");

      if (!buy_now.contains(event.target) && event.target !== buy_now_button) {
        buy_now.classList.remove("d-flex");
        buy_now.classList.add("d-none");
      }
    });
    // checkout button in the form
    let checkout = document.getElementById("Checkout");
    checkout.addEventListener("click", function () {
      buy_now.classList.remove("d-flex");
      buy_now.classList.add("d-none");
      alert("Thanks for buying");
    });

    // button that goes to cart page with the product selected
    let cart_page_button = document.getElementById("cart_page_button");
    cart_page_button.addEventListener("click", () => {
      sessionStorage.setItem("cart_div", JSON.stringify(products_details));
      window.location.href = "cart_page.html";
    });
  } else {
    console.error(`No product details found for ID: ${id}`);
  }
}

//! Open cart and close cart
var cart = document.querySelector(".cart");
function open_cart() {
  cart.classList.add("active");
}

function close_cart() {
  cart.classList.remove("active");
}

//! adding logic to cart
var items_in_cart = document.querySelector(".items-in-cart");
let product_cart = JSON.parse(localStorage.getItem("product_cart")) || [];
let price_cart_head = document.querySelector(".cost");
let count_item = document.querySelector(".count_item");
let count_item_cart = document.querySelector(".count_item_cart");
let price_cart_total = document.querySelector(".price-cart-total");
let id_Array = [];
let id_pointer = 0;
function addToCard(id, btn) {
  for (let i = 0; i < id_Array.length; i++) {
    if (id_Array[i] == id) {
      alert("Already added to cart");
      return;
    }
  }
  id_Array[id_pointer] = id;
  id_pointer++;
  product_cart.push(productsArray[id]);
  btn.classList.add("active");
  localStorage.setItem("product_cart", JSON.stringify(product_cart));
  getCartItems();
}

function getCartItems() {
  let total_price = 0;
  let items_c = "";
  for (let i = 0; i < product_cart.length; i++) {
    items_c += `
      <div class="item-cart">
        <img src="${product_cart[i].img}" alt="" />
        <div class="content">
          <h4>${product_cart[i].name}</h4>
          <p class="price-cart">$${product_cart[i].price}</p>
        </div>
        <button class="delete-item" onClick="remove_from_cart(${i})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
    total_price += product_cart[i].price;
  }

  items_in_cart.innerHTML = items_c;

  price_cart_head.innerHTML = "$" + total_price;
  count_item.innerHTML = product_cart.length;
  price_cart_total.innerHTML = "$" + total_price;
  count_item_cart.innerHTML = `${product_cart.length}(Item in Cart)`;
}

function remove_from_cart(index) {
  id_pointer--;
  id_Array.splice(index, 1);
  product_cart.splice(index, 1);
  localStorage.setItem("product_cart", JSON.stringify(product_cart));
  getCartItems();

  let addToCartButtons = document.querySelectorAll(".fa-cart-plus2 ");
  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].classList.remove("active");
    product_cart.forEach((product) => {
      if (product.id == i) {
        addToCartButtons[i].classList.add("active");
      }
    });
  }
}
