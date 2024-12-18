// DOM Elements
const loginContainer = document.getElementById('login-container');
const productsContainer = document.getElementById('products-container');
const header = document.getElementById('header');
const cartContainer = document.getElementById('cart-container');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItems = document.getElementById('cart-items');
const totalPriceElem = document.getElementById('total-price');
const logoutBtn = document.getElementById('logout-btn');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

// Predefined user credentials (for simplicity)
const userCredentials = {
  username: 'user123',
  password: 'password123'
};

// Cart data
let cart = [];

// Check if user is logged in
if (localStorage.getItem('loggedIn') === 'true') {
  showShop();
}

// Show the shop after login
function showShop() {
  loginContainer.style.display = 'none';
  productsContainer.style.display = 'block';
  header.style.display = 'block';
  cartContainer.style.display = 'block';
}

// Login functionality
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username === userCredentials.username && password === userCredentials.password) {
    localStorage.setItem('loggedIn', 'true');
    showShop();
  } else {
    errorMessage.style.display = 'block';
  }
});

// Add product to cart
function addToCart(product, price) {
  cart.push({ name: product, price: price });
  updateCart();
}

// Update cart UI
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name}: $${item.price}`;
    cartItems.appendChild(li);
    total += parseFloat(item.price);
  });
  totalPriceElem.textContent = total.toFixed(2);
  cartBtn.textContent = `Cart (${cart.length})`;
}

// Event listeners for Add to Cart buttons
addToCartBtns.forEach(btn => {
  btn.addEventListener('click', function (e) {
    const product = e.target.getAttribute('data-product');
    const price = e.target.getAttribute('data-price');
    addToCart(product, price);
  });
});

// View cart modal
cartBtn.addEventListener('click', () => {
  cartModal.style.display = 'flex';
});

// Close cart modal
closeCartBtn.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('loggedIn');
  cart = [];
  cartBtn.textContent = 'Cart (0)';
  loginContainer.style.display = 'block';
  productsContainer.style.display = 'none';
  header.style.display = 'none';
  cartContainer.style.display = 'none';
});
