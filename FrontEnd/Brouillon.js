const { ethers } = require("ethers"); // Assure-toi d'importer ethers
const { JsonRpcProvider } = ethers; // Créer un fournisseur

const provider = new JsonRpcProvider(
  "https://mainnet.infura.io/v3/f09260a6b2cf4daab666cf5b454d8cc2"
);
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