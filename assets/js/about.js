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