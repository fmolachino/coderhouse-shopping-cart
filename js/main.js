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

// get the JSON data from the URL and parse it
(async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      productData = data;
  
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
    } catch (error) {
      console.error('Error while loading products', error);
    }
  })();

// add item to the cart
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

        Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
            text: `${product.name} - ${quantity} item(s) added to cart.`,
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: 'top-end',
            showConfirmButton: false
          });

        updateCart();
    }
}



function removeFromCart(productId) {
    const index = cart.findIndex(item => item.product.id === productId);
    if (index !== -1) {
        const removedProduct = cart[index].product;
        cart.splice(index, 1);

        localStorage.setItem('cart', JSON.stringify(cart));

        //sweetAlert message
        Swal.fire({
            icon: 'success',
            title: 'Removed from Cart',
            text: `${removedProduct.name} removed from cart.`,
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: 'top-end',
            showConfirmButton: false
          });

        updateCart();
    }
}

// update cart UI
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

// checkout logic and its controler
const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', () => {
    if(cart.length==0){
        //sweetAlert message
        Swal.fire({
            icon: 'error',
            title: 'Empty cart',
            text: `Cannot proceed, cart is empty.`,
            timer: 10000,
            timerProgressBar: true,
            toast: true,
            position: 'top-end',
            showConfirmButton: true
          });
    }

    else{
        //sweetAlert message
        Swal.fire({
            icon: 'success',
            title: 'Purchase successfully.',
            text: `Congratulations for your purchase. Total price: $${document.getElementById('total-price').innerText}`,
            timer: 10000,
            timerProgressBar: true,
            toast: true,
            position: 'center',
            showConfirmButton: true
          });
        cart.length = 0; // clear cart, as no logic is yet implemented on the checkout
        localStorage.removeItem('cart');
        updateCart();
    }
});


//auxiliar
function getQuantity(productId){
    const quantityInput = document.getElementById(`product-quantity-${productId}`);
    return quantityInput;
}