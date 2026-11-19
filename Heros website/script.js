let cart = JSON.parse(localStorage.getItem("herosCart")) || [];

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

// Add products to cart
document.querySelectorAll(".add-to-cart").forEach(button => {

    button.addEventListener("click", () => {
const product = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: Number(button.dataset.price),
            image: button.dataset.image,
            quantity: 1
        };
         const existingProduct = cart.find(
            item => item.id === product.id
        );

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }
         saveCart();
        displayCart();

    });

});

// Save cart
function saveCart() {
    localStorage.setItem("herosCart", JSON.stringify(cart));
}

// Display cart
function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is currently empty.</p>";
    }

    cart.forEach(item => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
             <img src="${item.image}" alt="${item.name}">

                <div>
                    <h3>${item.name}</h3>
                    <p>₦${item.price.toLocaleString("en-NG")}</p>

                    <button onclick="changeQuantity('${item.id}', -1)">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity('${item.id}', 1)">+</button>

                    <button class="remove-item"
                        onclick="removeItem('${item.id}')">
                        Remove
                    </button>
                </div>

            </div>
        `;
    });

    cartCount.textContent = count;
    cartTotal.textContent = total.toLocaleString("en-NG");

}

// Change quantity
function changeQuantity(id, amount) {

    const product = cart.find(item => item.id === id);
    if (!product) return;

    product.quantity += amount;

    if (product.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    saveCart();
    displayCart();
}
// Checkout button
document.getElementById("checkout-btn")
    .addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert("Proceeding to HEROS checkout!");

    });

// Load saved cart when page opens
displayCart();
