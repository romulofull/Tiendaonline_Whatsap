let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productDiv = button.parentElement;
        const productName = productDiv.querySelector('h2').innerText; 
        const priceText = productDiv.querySelectorAll('h2')[1].innerText; 
        const price = parseFloat(priceText.replace('USD ', '')); 
        const size = productDiv.querySelector('.size').value;
        const quantity = parseInt(productDiv.querySelector('.quantity').value);
        
        
        const subtotal = price * quantity;

        const subtotalElement = productDiv.querySelector('.subtotal');
        subtotalElement.innerText = `Subtotal: USD ${subtotal.toFixed(2)}`;

        const existingItem = cart.find(item => item.name === productName && item.size === size);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const item = { name: productName, size: size, quantity: quantity, price: price };
            cart.push(item);
        }
        updateCart();
    });
});

function updateCart() {
    const cartList = document.getElementById('cart');
    const totalElement = document.getElementById('total');
    cartList.innerHTML = '';
    
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.name} - Talle: ${item.size} - Cantidad: ${item.quantity}`;
        cartList.appendChild(li);
        const itemSubtotal = item.price * item.quantity;
        total += itemSubtotal;
    });

    totalElement.innerText = `Total: USD ${total.toFixed(2)}`;
}

document.getElementById('clear-cart').addEventListener('click', () => {
    cart = []; 
    updateCart(); 
});
