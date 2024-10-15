const menuburger = document.getElementById("burger");
const navLinks = document.querySelector(".nav-link");
const boxpop = document.querySelector(".boxpop");
const exit = document.getElementById("exite");
const form = document.getElementById("form");

menuburger.addEventListener("click", () =>
  navLinks.classList.toggle("mobil-menu")
);

function insert(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculate() {
  try {
    let expression = document.getElementById("display").value;
    expression = expression.replace(/x/g, "*");
    let result = eval(expression);
    document.getElementById("display").value = result;
  } catch (error) {
    document.getElementById("display").value = "Syntax error";
  }
}

function onScroll() {
  boxpop.style.right = 30 + "px";
}
window.addEventListener("scroll", onScroll);

exit.addEventListener("click", () => {
  boxpop.style.right = -750 + "px";
  window.removeEventListener("scroll", onScroll);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
});


