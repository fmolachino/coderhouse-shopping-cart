// product data. TODO: be in a json and then parse it.
const products = [
    { id: 1, name: 'Barret M82', price: 90000.99, image: "./images/guns/barret-m82.jpg"},
    { id: 2, name: 'Bruni 45', price: 990.70, image: "./images/guns/bruni-45.jpg" },
    { id: 3, name: 'High Point 45', price: 1200.99, image: "./images/guns/high-point-45.jpg" },
    { id: 4, name: 'Kimar 8', price: 800.99, image: "./images/guns/kimar-8.jpg" },
    { id: 5, name: 'Rifle M4', price: 7500.99, image: "./images/guns/m4.jpg" },
    { id: 6, name: 'Revolver 22', price: 500.99, image: "./images/guns/mini-gun-22.jpg" },
    { id: 7, name: 'MP 22', price: 950.99, image: "./images/guns/mp-22.jpg" },
    { id: 8, name: 'Ammo Box 1000 Rounds', price: 600.99, image: "./images/ammo/ammo-box-9.jpg" },
    { id: 9, name: 'Luger 9 - 100 Rounds', price: 120.99, image: "./images/ammo/ammo-lurger-100-9.jpg" },
    { id: 10, name: 'Winchester 9 - 100 Rounds', price: 150.99, image: "./images/ammo/ammo-winchester-100-9.jpg" },
    { id: 11, name: 'Barret M82', price: 90000.99, image: "./images/guns/barret-m82.jpg"},
    { id: 12, name: 'Bruni 45', price: 990.70, image: "./images/guns/bruni-45.jpg" },
    { id: 13, name: 'High Point 45', price: 1200.99, image: "./images/guns/high-point-45.jpg" },
    { id: 14, name: 'Kimar 8', price: 800.99, image: "./images/guns/kimar-8.jpg" },
    { id: 15, name: 'Rifle M4', price: 7500.99, image: "./images/guns/m4.jpg" },
    { id: 16, name: 'Revolver 22', price: 500.99, image: "./images/guns/mini-gun-22.jpg" },
];

// cart init
const cart = [];

// fill product-list ul as div elements
const productList = document.getElementById('product-list');
products.forEach(product => {
    const li = document.createElement('div');
    li.innerHTML = `
        <img src=${product.image} />
        <h3>${product.name} - $${product.price}</h3>
        <input type="number" id="product-quantity-${product.id}" min="1" value="1">
        <br><br>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(li);
});

// add the item to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(getQuantity(productId).value);

    if (quantity > 0) {
        const existingItem = cart.find(item => item.product.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ product, quantity });
        }
        
        updateCart();
    }
}



function removeFromCart(productId) {
    const index = cart.findIndex(item => item.product.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

// update cart ui
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.product.name} - $${item.product.price} x ${item.quantity}</span>
            <button onclick="removeFromCart(${item.product.id})">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.product.price * item.quantity;
    });

    totalPrice.innerText = total.toFixed(2);
}

// checkout>>>>>>>>>
const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', () => {
    
    alert('Checkout successful!');
    cart.length = 0; // clear cart, as no logic is yet implemented on the checkout
    updateCart();
});


//auxiliar
function getQuantity(productId){
    const quantityInput = document.getElementById(`product-quantity-${productId}`);
    return quantityInput;
}