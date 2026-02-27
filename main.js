// shared javascript for cart, navigation, and simple interactions

document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartList = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');

  function renderCart() {
    if (!cartList) return;
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const li = document.createElement('li');
      const subtotal = item.price * item.qty;
      if (item.image) {
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.product;
        img.style.width = '40px';
        img.style.marginRight = '8px';
        li.appendChild(img);
      }
      li.appendChild(document.createTextNode(`${item.product} — ${item.qty} × $${item.price.toFixed(2)} = $${subtotal.toFixed(2)}`));
      cartList.appendChild(li);
      total += subtotal;
    });
    if (cartTotalEl) cartTotalEl.textContent = total.toFixed(2);
  }

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.dataset.product;
      const price = parseFloat(btn.dataset.price);
      const image = btn.dataset.image || '';
      const existing = cart.find(i => i.product === product);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({product, price, image, qty: 1});
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });
  });

  document.getElementById('checkout-btn')?.addEventListener('click', goToCheckout);
  document.getElementById('place-order')?.addEventListener('click', placeOrder);
  document.getElementById('shop-now')?.addEventListener('click', () => { window.location.href = 'shop.html'; });
  document.getElementById('learn-more')?.addEventListener('click', () => { window.location.href = '#'; });

  // mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  renderCart();
  renderCheckout();
});

function goToCheckout() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    window.location.href = 'checkout.html';
  }
}

function renderCheckout() {
  const table = document.getElementById('checkout-items');
  const tbody = table?.querySelector('tbody');
  const totalEl = document.getElementById('checkout-total');
  if (!tbody || !totalEl) return;
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  tbody.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const row = document.createElement('tr');
    const subtotal = item.price * item.qty;
    row.innerHTML = `
      <td style="padding:8px; display:flex; align-items:center;"><img src="${item.image}" alt="${item.product}" style="width:50px; margin-right:8px;">${item.product}</td>
      <td style="padding:8px; text-align:right;">$${item.price.toFixed(2)}</td>
      <td style="padding:8px; text-align:right;">${item.qty}</td>
      <td style="padding:8px; text-align:right;">$${subtotal.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
    total += subtotal;
  });
  totalEl.textContent = total.toFixed(2);
}

function placeOrder() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Thank you for your purchase!');
  localStorage.removeItem('cart');
  window.location.href = 'index.html';
}

// utility for modal dialogs (used in shop.html)
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'block';
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}
