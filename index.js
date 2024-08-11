const menuburger = document.getElementById("burger");
const navLinks = document.querySelector(".nav-link");
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
    alert("Expression invalide");
  }
}
