// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const cartElement = document.querySelector('.cart');
const overlay = document.getElementById('overlay');
const step1Window = document.getElementById('step1Window');
const confirmOrderWindow = document.getElementById('confirmOrderWindow');
const step2Window = document.getElementById('step2Window');
const step1Form = document.getElementById('step1Form');
const confirmOrderButton = document.getElementById('confirmOrderButton');
const editOrderButton = document.getElementById('editOrderButton');
const step2Form = document.getElementById('step2Form');
const orderButton = document.getElementById('orderButton');

// Update cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCart();
    
    // Add event listeners for mobile menu
    document.querySelector('.hamburger').addEventListener('click', toggleMenu);
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.menu-main a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                toggleMenu();
            }
        });
    });
});

// Toggle cart visibility
function toggleCart() {
    cartElement.classList.toggle('active');
    overlay.style.display = cartElement.classList.contains('active') ? 'block' : 'none';
}

// Toggle mobile menu
function toggleMenu() {
    document.querySelector('.menu-main').classList.toggle('active');
}

// Show order form
function showOrderForm() {
    if (cart.length === 0) {
        alert('Coșul este gol! Adăugați produse înainte de a plasa o comandă.');
        return;
    }
    
    toggleCart();
    overlay.style.display = 'block';
    step1Window.style.display = 'block';
    setTimeout(() => {
        step1Window.classList.add('active');
    }, 10);
}

// Update cart UI
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPrice = document.getElementById('total-price');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('flex', 'items-center', 'justify-between', 'mb-2', 'pb-2', 'border-b');
        div.innerHTML = `
            <div class="flex items-center">
                <img src="${item.img || 'https://via.placeholder.com/50'}" alt="${item.name}" class="w-12 h-12 object-cover rounded mr-2">
                <div>
                    <p class="text-sm font-medium">${item.name}</p>
                    <p class="text-xs text-gray-500">${item.price} MDL × ${item.quantity}</p>
                </div>
            </div>
            <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">
                <i class="fas fa-times"></i>
            </button>
        `;
        cartItems.appendChild(div);
        total += item.price * item.quantity;
    });
    
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalPrice.textContent = total.toFixed(2);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Step 1 Form Submission
step1Form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    
    if (name && phone && address) {
        step1Window.classList.remove('active');
        setTimeout(() => {
            step1Window.style.display = 'none';
            
            confirmOrderWindow.style.display = 'block';
            setTimeout(() => {
                confirmOrderWindow.classList.add('active');
            }, 10);
            
            updateConfirmOrderWindow();
        }, 300);
    } else {
        alert('Vă rugăm să completați toate câmpurile.');
    }
});

// Update order confirmation window
function updateConfirmOrderWindow() {
    const cartItemsConfirm = document.getElementById('cart-items-confirm');
    const totalPriceConfirm = document.getElementById('total-price-confirm');
    
    cartItemsConfirm.innerHTML = '';
    let total = 0;
    
    cart.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('flex', 'items-center', 'justify-between', 'mb-2', 'pb-2', 'border-b');
        div.innerHTML = `
            <div class="flex items-center">
                <img src="${item.img || 'https://via.placeholder.com/50'}" alt="${item.name}" class="w-12 h-12 object-cover rounded mr-2">
                <div>
                    <p class="text-sm font-medium">${item.name}</p>
                    <p class="text-xs text-gray-500">${item.price} MDL × ${item.quantity}</p>
                </div>
            </div>
            <p class="text-sm font-medium">${(item.price * item.quantity).toFixed(2)} MDL</p>
        `;
        cartItemsConfirm.appendChild(div);
        total += item.price * item.quantity;
    });
    
    totalPriceConfirm.textContent = total.toFixed(2);
}

// Confirm order button
confirmOrderButton.addEventListener('click', () => {
    confirmOrderWindow.classList.remove('active');
    setTimeout(() => {
        confirmOrderWindow.style.display = 'none';
        step2Window.style.display = 'block';
        setTimeout(() => {
            step2Window.classList.add('active');
        }, 10);
    }, 300);
});

// Edit order button
editOrderButton.addEventListener('click', () => {
    confirmOrderWindow.classList.remove('active');
    setTimeout(() => {
        confirmOrderWindow.style.display = 'none';
        step1Window.style.display = 'block';
        setTimeout(() => {
            step1Window.classList.add('active');
        }, 10);
    }, 300);
});

// Step 2 Form Submission
step2Form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const cardNumber = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    if (cardNumber && expiry && cvv) {
        // In a real application, you would process the payment here
        console.log('Order details:', {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            cart: cart,
            total: document.getElementById('total-price-confirm').textContent,
            payment: {
                cardNumber,
                expiry,
                cvv
            }
        });
        
        // Clear cart after successful order
        cart = [];
        localStorage.removeItem('cart');
        updateCart();
        
        // Hide all modals
        step2Window.classList.remove('active');
        overlay.style.display = 'none';
        setTimeout(() => {
            step2Window.style.display = 'none';
        }, 300);
        
        // Reset forms
        step1Form.reset();
        step2Form.reset();
        
        // Show success message
        alert('Plata a fost efectuată cu succes! Vă mulțumim pentru comandă!');
    } else {
        alert('Vă rugăm să completați toate câmpurile.');
    }
});

// Overlay click handler
overlay.addEventListener('click', () => {
    step1Window.classList.remove('active');
    confirmOrderWindow.classList.remove('active');
    step2Window.classList.remove('active');
    cartElement.classList.remove('active');
    overlay.style.display = 'none';
    
    setTimeout(() => {
        step1Window.style.display = 'none';
        confirmOrderWindow.style.display = 'none';
        step2Window.style.display = 'none';
    }, 300);
});
