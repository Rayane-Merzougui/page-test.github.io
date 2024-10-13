const { ethers } = require("ethers"); // Assure-toi d'importer ethers
const { JsonRpcProvider } = ethers; // Créer un fournisseur

const provider = new JsonRpcProvider(
  "https://mainnet.infura.io/v3/f09260a6b2cf4daab666cf5b454d8cc2"
);

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

const address = "0x74f306D64244319F642BF405054743A5A8400302";
const main = async () => {
  try {
    const balance = await provider.getBalance(address);
    console.log(
      `\nETH Balance of ${address} --> ${ethers.utils.formatEther(
        balance
      )} ETH\n`
    );
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
};

main();
