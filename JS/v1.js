let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".add-to-cart").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            addToCart(this);
        });
    });
    updateCart();
});

function toggleCart() {
    document.getElementById('cart').classList.toggle('active');
}

function addToCart(link) {
    let item = link.parentElement;
    let name = item.getAttribute('data-name');
    let price = parseFloat(item.getAttribute('data-price'));
    let img = item.getAttribute('data-img');

    let existingItem = cart.find(i => i.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, img, quantity: 1 });
    }

    saveAndUpdateCart();
    showAddedToCartMessage();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveAndUpdateCart();
}

function saveAndUpdateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById('cart-items');
    let cartCount = document.getElementById('cart-count');
    let totalPrice = document.getElementById('total-price');

    if (cartItems && cartCount && totalPrice) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            let div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <p>${item.name} - ${item.price} MDL (x${item.quantity})</p>
                <a href="#" onclick="removeFromCart(${index})">&#x2715</a>
            `;
            cartItems.appendChild(div);
            total += item.price * item.quantity;
        });

        cartCount.textContent = cart.length;
        totalPrice.textContent = total.toFixed(2);
    }
}

function showAddedToCartMessage() {
    let message = document.getElementById('cart-message');
    if (message) {
        message.classList.add('show');

        setTimeout(function () {
            message.classList.remove('show');
        }, 3000);
    }
}

const orderButton = document.getElementById('orderButton');
const overlay = document.getElementById('overlay');
const step1Window = document.getElementById('step1Window');
const confirmOrderWindow = document.getElementById('confirmOrderWindow');
const step2Window = document.getElementById('step2Window');
const step1Form = document.getElementById('step1Form');
const confirmOrderButton = document.getElementById('confirmOrderButton');
const editOrderButton = document.getElementById('editOrderButton');
const step2Form = document.getElementById('step2Form');

orderButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Coșul este gol! Adăugați produse înainte de a plasa o comandă.');
    } else {
        overlay.style.display = 'block';
        step1Window.style.display = 'block';
        setTimeout(() => {
            step1Window.classList.add('active');
        }, 10);
    }
});

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

function updateConfirmOrderWindow() {
    const cartItemsConfirm = document.getElementById('cart-items-confirm');
    const totalPriceConfirm = document.getElementById('total-price-confirm');

    if (cartItemsConfirm && totalPriceConfirm) {
        cartItemsConfirm.innerHTML = '';
        let total = 0;
        cart.forEach((item) => {
            let div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <p>${item.name} - ${item.price} MDL (x${item.quantity})</p>
            `;
            cartItemsConfirm.appendChild(div);
            total += item.price * item.quantity;
        });
        totalPriceConfirm.textContent = total.toFixed(2);
    }
}

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

step2Form.addEventListener('submit', (event) => {
    event.preventDefault();

    const cardNumber = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

    if (cardNumber && expiry && cvv) {
        console.log('Datele utilizatorului:', {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            cardNumber,
            expiry,
            cvv,
        });

        cart = [];
        localStorage.removeItem('cart');
        updateCart();

        step2Window.classList.remove('active');
        overlay.style.display = 'none';
        setTimeout(() => {
            step2Window.style.display = 'none';
        }, 300);

        step1Form.reset();
        step2Form.reset();

        alert('Plata a fost efectuată cu succes!');
    } else {
        alert('Vă rugăm să completați toate câmpurile.');
    }
});

overlay.addEventListener('click', () => {
    step1Window.classList.remove('active');
    confirmOrderWindow.classList.remove('active');
    step2Window.classList.remove('active');
    overlay.style.display = 'none';
    setTimeout(() => {
        step1Window.style.display = 'none';
        confirmOrderWindow.style.display = 'none';
        step2Window.style.display = 'none';
    }, 300);
});

function toggleMenu() {
    document.querySelector(".menu-main").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});
