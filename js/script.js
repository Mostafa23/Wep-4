// script.js

// Elements
const allProducts = document.getElementById("products");
const cartProductDiv = document.querySelector(".carts_products div");
const badgeN = document.querySelector(".badgeN");
const badge = document.querySelector(".badge");
const shoppingCartIcon = document.querySelector(".shopping_cart");
const cartsProducts = document.querySelector(".carts_products");
const searchS = document.getElementById("Search");
const selectElement = document.getElementById("selectSearch");

// Initialize variables
let addedItem = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
const products = [
    { id: 1, title: "bentley continental supersports 2012", imageUrl: "Images/bentley continental supersports 2012.jpg", category: "Car", price: 80000, favorit: false },
    { id: 2, title: "volkswagen tiguan 2020", imageUrl: "Images/volkswagentiguan2020.jpg", category: "Car", price: 26000, favorit: false },
    { id: 3, title: "mitsubishi eclipse 2024", imageUrl: "Images/mitsubishieclipse2024.jpg", category: "Car", price: 36000, favorit: false },
    { id: 4, title: "renault kadjar 2019", imageUrl: "Images//Ali.jpg", category: "Car", price: 24000, favorit: false },
    { id: 5, title: "A 180", imageUrl: "Images//img1.jpg", category: "Car", price: 28000, favorit: false },
    { id: 6, title: "CLS 180", imageUrl: "Images/img2.jpg", category: "Car", price: 12000, favorit: false },
    { id: 7, title: "B class", imageUrl: "Images//img3.jpg", category: "Car", price: 14000, favorit: false },
    { id: 8, title: "E Class", imageUrl: "Images/img4.jpg", category: "Car", price: 23000, favorit: false },
    { id: 9, title: "kia soul 2014", imageUrl: "Images//abdlahmid.jpg", category: "Car", price: 15000, favorit: false },
    { id: 10, title: "mercedes benz slr mclaren", imageUrl: "Images//mercedes benz slr mclaren.jpg", category: "Car", price: 500000, favorit: false },
    { id: 11, title: "bugatti veyron super sports Mansory Edition", imageUrl: "Images//bugatti veyron super sports Mansory Edition.png", category: "Car", price: 900000, favorit: false },
    { id: 12, title: "10 Car Garage", imageUrl: "Images//garage.webp", category: "Bulid", price: 75000, favorit: false }
];

// Functions
function renderCart() {
    cartProductDiv.innerHTML = addedItem.map(item => generateCartItemHTML(item)).join('');
    badge.style.display = addedItem.length ? "flex" : "none";
    // badgeN.innerHTML = addedItem.reduce((total, item) => total + item.quantity, 0);
    badgeN.innerHTML = addedItem.length;
}

function generateCartItemHTML(item) {
    return `
    <div class="cart-item" id="cart-item-${item.id}">
        <div class="cart-item-content">
            <p class="cart-item-title">${item.title}</p>
            <div class="quantity-control">
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
            </div>
        </div>
    </div>`;
}

function check() {
    if (!localStorage.getItem("username")) {        
        localStorage.clear();

        setTimeout(() => {
            alert("Please Login!!")

            window.location = "login.html";
        }, 300);        
        return false; 
    }
    return true; 
}

function toggleCart(id) {
    if (!check()) return;

    let choosenItem = products.find(item => item.id === id);
    let existingItem = addedItem.find(item => item.id === id);

    if (existingItem) {
        addedItem = addedItem.filter(item => item.id !== id);
        document.getElementById(`cart-item-${id}`).remove();
    } else {
        choosenItem.quantity = 1;
        addedItem = [...addedItem, choosenItem];
        cartProductDiv.innerHTML += generateCartItemHTML(choosenItem);
    }

    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    updateProductButtons();
    renderCart();
}

function changeQuantity(id, delta) {
    let item = addedItem.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            addedItem = addedItem.filter(item => item.id !== id);
            document.getElementById(`cart-item-${id}`).remove();
            updateProductButtons()
        } else {
            document.querySelector(`#cart-item-${id} .quantity-control span`).textContent = item.quantity;
        }
        localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    }
    renderCart();
}

function updateProductButtons() {
    document.querySelectorAll('.add_to_cart').forEach(button => {
        let id = button.getAttribute('data-id');
        let inCart = addedItem.find(item => item.id === parseInt(id));
        if (inCart) {
            button.textContent = "Remove From Cart";
            button.style.backgroundColor = 'red';
        } else {
            button.textContent = "Add To Cart";
            button.style.backgroundColor = 'green';
        }
    });
}

function toggleCartDisplay(event) {
    event.stopPropagation();
    cartsProducts.style.display = cartsProducts.style.display === "block" ? "none" : "block";
}

function closeCartOnClickOutside() {
    cartsProducts.style.display = cartsProducts.style.display === "block" ? "none" : null;
}

function updateFilteredProducts() {
    let searchTerm = searchS.value.toLowerCase();
    let selectedOption = selectElement.value;

    let filteredProducts = products.filter(item => {
        if (selectedOption === "1") {
            return item.title.toLowerCase().includes(searchTerm);
        } else if (selectedOption === "2") {
            return item.category.toLowerCase().includes(searchTerm);
        }
        return false;
    });

    drawFilteredItems(filteredProducts);
}

function changeHeart(itemId) {
    if (!check()) return;

    let item = products.find(product => product.id === itemId);
    if (item) {
        item.favorit = !item.favorit; 
        console.log(item)

        let favorites = products.filter(p => p.favorit);
        localStorage.setItem('Favorites', JSON.stringify(favorites));

        drawFilteredItems(products);
    }
}

function drawFilteredItems(filteredProducts) {
    let productsF = filteredProducts.map(item => {
        return `
        <div class="col">
            <div class="card card_sum">
                <img src="${item.imageUrl}" class="card-img-top" alt="${item.title}">
                <div class="card-body pro_">
                    <h5 class="card-title">Product: ${item.title}</h5>
                    <h5 class="card-title">Price: ${item.price}$</h5>
                    <h5 class="card-title">Category: ${item.category}</h5>
                    <button class="add_to_cart btn btn-secondary btnSS" data-id="${item.id}" onClick="toggleCart(${item.id})"></button>
                    <a onClick="changeHeart(${item.id})"><i class="fas fa-heart fav favorite_icon ${item.favorit ? 'red-heart' : ''}"></i></a>    
                </div>
            </div>
        </div>
        `;
    }).join('');

    allProducts.innerHTML = productsF;
    updateProductButtons(); 
}

// Event listeners
shoppingCartIcon.addEventListener("click", toggleCartDisplay);
cartsProducts.addEventListener("click", event => event.stopPropagation());
document.addEventListener("click", closeCartOnClickOutside);
selectElement.addEventListener('change', updateFilteredProducts);
searchS.addEventListener('input', updateFilteredProducts);

// Initial setup
document.addEventListener('DOMContentLoaded', function() {
    let savedFavorites = localStorage.getItem('Favorites');
    if (savedFavorites) {
        let favorites = JSON.parse(savedFavorites);
        products.forEach(p => {
            let fav = favorites.find(f => f.id === p.id);
            if (fav) {
                p.favorit = fav.favorit;
            }
        });
    }
    drawFilteredItems(products); 
    renderCart(); 
});

updateFilteredProducts();
