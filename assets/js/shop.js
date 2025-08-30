// assets/js/app.js
const API_URL = "https://api.escuelajs.co/api/v1/products"; 
const CATEGORY_URL = "https://api.escuelajs.co/api/v1/categories";

const productGrid = document.getElementById("product-grid");
const categoriesContainer = document.querySelector("[data-categories]");
const searchInput = document.querySelector('input[type="search"]');
const loadMoreBtn = document.getElementById("load-more");
const yearSpan = document.querySelector("[data-year]");

let products = [];
let filteredProducts = [];
let currentPage = 1;
const perPage = 8;

// Fetch products
async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log("Products:", data); // log fetched data
    products = data;
    filteredProducts = data;
    renderProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Fetch categories
async function fetchCategories() {
  try {
    const res = await fetch(CATEGORY_URL);
    const data = await res.json();
    console.log("Categories:", data);
    renderCategories(data);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// Render products
function renderProducts() {
  productGrid.innerHTML = "";

  const start = 0;
  const end = currentPage * perPage;
  const productsToShow = filteredProducts.slice(start, end);

  productsToShow.forEach((p) => {
    const item = document.createElement("div");
    item.className = "card";
    item.innerHTML = `
      <img src="${p.images[0]}" alt="${p.title}" />
      <div class="card-body">
      <h3 class="card-title">${p.title}</h3>
      <p>$${p.price}</p>
      <button class="btn">Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(item);
  });

  // Hide load more if all products are shown
  if (end >= filteredProducts.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

// Render categories
function renderCategories(categories) {
  categoriesContainer.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.className = "chip";
  allBtn.addEventListener("click", () => {
    filteredProducts = products;
    currentPage = 1;
    renderProducts();
  });
  categoriesContainer.appendChild(allBtn);

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat.name;
    btn.className = "chip";
    btn.addEventListener("click", () => {
      filteredProducts = products.filter(
        (p) => p.category.name.toLowerCase() === cat.name.toLowerCase()
      );
      currentPage = 1;
      renderProducts();
    });
    categoriesContainer.appendChild(btn);
  });
}

// Search functionality
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(term)
  );
  currentPage = 1;
  renderProducts();
});

// Load more functionality
loadMoreBtn.addEventListener("click", () => {
  currentPage++;
  renderProducts();
});
// Set footer year
yearSpan.textContent = new Date().getFullYear();
// Header menu toggle
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const navClose = document.getElementById("navClose");

menuBtn.addEventListener("click", () => {
  nav.classList.add("active");
});

navClose.addEventListener("click", () => {
  nav.classList.remove("active");
});

// Optional: close nav when clicking a link
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("active"));
});


// Initialize
fetchProducts();
fetchCategories();
