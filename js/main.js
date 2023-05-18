const url = 'js/products.json';
let productData;
let cart = [];


// get localStorage data and uptdates cart whenever the page is refreshed or enter into
window.addEventListener('load', () => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      cart = JSON.parse(cartData);
    }
    updateCart();
  });

// fetch the JSON data from the URL
fetch(url)
  .then(response => response.json())
  .then(data => {
    
    //save the json data into productData variable
    productData = data;

    // fill product-list ul as div elements
    const productList = document.getElementById('product-list');
    productData.forEach(product => {
        const li = document.createElement('div');
        li.innerHTML = `
            <img src=${product.image} />
            <h3>${product.name}</h3>
            <h3>$${product.price}<h3>
            <input type="number" id="product-quantity-${product.id}" min="1" value="1">
            <br><br>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(li);
    });
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error);
  });


// add the item to the cart
function addToCart(productId) {
    const product = productData.find(p => p.id === productId);
    const quantity = parseInt(getQuantity(productId).value);

    if (quantity > 0) {
        const existingItem = cart.find(item => item.product.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ product, quantity });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCart();
    }
}



function removeFromCart(productId) {
    const index = cart.findIndex(item => item.product.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);

        localStorage.setItem('cart', JSON.stringify(cart));

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
    localStorage.removeItem('cart');
    updateCart();
});


//auxiliar
function getQuantity(productId){
    const quantityInput = document.getElementById(`product-quantity-${productId}`);
    return quantityInput;
}