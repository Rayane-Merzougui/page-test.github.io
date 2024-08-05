const menuburger = document.getElementById("burger");
const navLinks = document.querySelector(".nav-link");
menuburger.addEventListener("click", () =>
  navLinks.classList.toggle("mobil-menu")
);
