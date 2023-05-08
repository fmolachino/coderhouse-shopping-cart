// product data. TODO: be in a json and then parse it.
const products = [
    { id: 1, name: 'Barret M82', price: 90000.99, image: "../images/guns/barret-m82.jpg"},
    { id: 2, name: 'Product 2', price: 19.99, image: 'https://picsum.photos/200' },
    { id: 3, name: 'Product 3', price: 7.99, image: 'https://picsum.photos/200' },
    { id: 4, name: 'Product 4', price: 12.99, image: 'https://picsum.photos/200' },
];

// cart init
const cart = [];

// fill product-list ul
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