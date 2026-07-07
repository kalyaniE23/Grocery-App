
// PRODUCT DATA // 

const products = [
{
id:1,
name:"Apple",
category:"Fruits & Vegetables",
weight:"1 kg",
price:180,
image:"apple.jpg",
quantity:0
},
{
id:2,
name:"Banana",
category:"Fruits & Vegetables",
weight:"1 dozen",
price:60,
image:"banana.jpg",
quantity:0
},
{
id:3,
name:"tomato",
category:"Fruits & Vegetables",
weight:"1 kg",
price:40,
image:"tomato.webp",
quantity:0
},
{
id:4,
name:"Milk",
category:"Dairy & Eggs",
weight:"1 litre",
price:65,
image:"milk.jpg",
quantity:0
},
{
id:5,
name:"Eggs",
category:"Dairy & Eggs",
weight:"6 pieces",
price:55,
image:"eggs.webp",
quantity:0
},
{
id:6,
name:"Butter",
category:"Dairy & Eggs",
weight:"500 g",
price:120,
image:"butter.webp",
quantity:0
},
{
id:7,
name:"Chips",
category:"Snacks",
weight:"150 g",
price:30,
image:"chips.webp",
quantity:0
},
{
id:8,
name:"Biscuits",
category:"Snacks",
weight:"250 g",
price:40,
image:"biscuits.webp",
quantity:0
},
{
id:9,
name:"Orange Juice",
category:"Beverages",
weight:"1 litre",
price:110,
image:"orange-juice.webp",
quantity:0
},
{
id:10,
name:"Bread",
category:"Bakery",
weight:"400 g",
price:45,
image:"bread.webp",
quantity:0
},
{
id:11,
name:"Shampoo",
category:"Personal Care",
weight:"200 ml",
price:180,
image:"shampoo.avif",
quantity:0
},
{
id:12,
name:"Soap",
category:"Personal Care",
weight:"125 g",
price:35,
image:"soap.webp",
quantity:0
}
];


// DOM ELEMENTS // 

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");

const cartCount = document.getElementById("cartCount");
const totalItems = document.getElementById("totalItems");
const totalPrice = document.getElementById("totalPrice");

const cartSummary = document.getElementById("cartSummary");
const checkoutBtn = document.getElementById("checkoutBtn");

const noProducts = document.getElementById("noProducts");


// FILTER VARIABLES //

let selectedCategory = "All";
let searchText = "";


// DISPLAY PRODUCTS //

function displayProducts() {

    productGrid.innerHTML = "";

    const filteredProducts = products.filter(product => {

        const categoryMatch =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const searchMatch =
            product.name.toLowerCase().includes(searchText.toLowerCase());

        return categoryMatch && searchMatch;

    });

    if (filteredProducts.length === 0) {

        noProducts.style.display = "block";
        return;

    }

    noProducts.style.display = "none";

    filteredProducts.forEach(product => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p class="weight">${product.weight}</p>

            <p class="price">₹${product.price}</p>

            ${
                product.quantity === 0
                ?

                `<button
                    class="add-btn"
                    onclick="addToCart(${product.id})">
                    Add
                </button>`

                :

                `<div class="quantity">

                    <button onclick="decreaseQty(${product.id})">
                        -
                    </button>

                    <span>${product.quantity}</span>

                    <button onclick="increaseQty(${product.id})">
                        +
                    </button>

                </div>`
            }

        `;

        productGrid.appendChild(card);

    });

}

// CATEGORY FILTER //

categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        this.classList.add("active");

        selectedCategory = this.dataset.category;

        displayProducts();

    });

});


// LIVE SEARCH //

searchInput.addEventListener("input", function () {

    searchText = this.value;

    displayProducts();

});


// ADD TO CART // 

function addToCart(id) {

    const product = products.find(item => item.id === id);

    product.quantity = 1;

    updateCart();

}


// INCREASE QUANTITY // 

function increaseQty(id) {

    const product = products.find(item => item.id === id);

    product.quantity++;

    updateCart();

}

// DECREASE QUANTITY //

function decreaseQty(id) {

    const product = products.find(item => item.id === id);

    product.quantity--;

    if (product.quantity < 0) {
        product.quantity = 0;
    }

    updateCart();

}


// UPDATE CART //

function updateCart() {

    let items = 0;
    let price = 0;

    products.forEach(product => {

        items += product.quantity;

        price += product.quantity * product.price;

    });

    cartCount.textContent = items;
    totalItems.textContent = items;
    totalPrice.textContent = price;

    if (items > 0) {

        cartSummary.style.display = "flex";

    } else {

        cartSummary.style.display = "none";

    }

    displayProducts();

}

// CHECKOUT // 

checkoutBtn.addEventListener("click", function () {

    alert("Order Placed Successfully!");

    products.forEach(product => {

        product.quantity = 0;

    });

    updateCart();

});

// INITIAL LOAD //

displayProducts();