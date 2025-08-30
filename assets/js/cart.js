// === CART STORAGE HELPERS ===
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  let cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  alert(`${product.title} added to cart!`);
}

function updateCartBadge() {
  const cartCountEls = document.querySelectorAll("[data-cart-count]");
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCountEls.forEach(el => el.textContent = count);
}

// === PRODUCT LIST PAGE (index.html) ===
async function loadProducts() {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=12");
    const products = await res.json();
    console.log(products);

    const grid = document.getElementById("product-grid");
    if (!grid) return;

    grid.innerHTML = products.map(p => `
      <div class="card">
        <img src="${p.images[0]}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>$${p.price}</p>
        <button class="btn add-to-cart" data-id="${p.id}" data-title="${p.title}" data-price="${p.price}" data-image="${p.images[0]}">Add to Cart</button>
      </div>
    `).join("");

    // attach event listeners
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", () => {
        const product = {
          id: btn.dataset.id,
          title: btn.dataset.title,
          price: parseFloat(btn.dataset.price),
          image: btn.dataset.image
        };
        addToCart(product);
      });
    });

  } catch (err) {
    console.error("Error fetching products", err);
  }
}

// === CART PAGE (cart.html) ===
function renderCartPage() {
  const cartItemsEl = document.getElementById("cart-items");
  if (!cartItemsEl) return; // means we’re not on cart.html

  const cart = getCart();
  let subtotal = 0;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartItemsEl.innerHTML = cart.map(item => {
      subtotal += item.price * item.quantity;
      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}">
          <div>
            <h3>${item.title}</h3>
            <p>$${item.price} x ${item.quantity}</p>
          </div>
          <button class="remove" data-id="${item.id}">Remove</button>
        </div>
      `;
    }).join("");
  }

  // update summary
  const shipping = subtotal > 0 ? 10 : 0;
  document.getElementById("subtotal").textContent = `$${subtotal}`;
  document.getElementById("shipping").textContent = `$${shipping}`;
  document.getElementById("total").textContent = `$${subtotal + shipping}`;

  // remove functionality
  document.querySelectorAll(".remove").forEach(btn => {
    btn.addEventListener("click", () => {
      let cart = getCart().filter(item => item.id !== btn.dataset.id);
      saveCart(cart);
      renderCartPage(); // re-render
    });
  });
}

// === INIT ===
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  loadProducts();
  renderCartPage();
});
