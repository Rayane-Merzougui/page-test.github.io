// Adresse et ABI du contrat
const contractAddress = "0x74f306D64244319F642BF405054743A5A8400302";
const contractABI = [ 
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "MessageDeleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        }
      ],
      "name": "NewMessage",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_message",
          "type": "string"
        }
      ],
      "name": "addMessage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "changeOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "deleteMessage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllMessages",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "messages",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

// Connexion à Metamask
async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await ethereum.request({ method: "eth_requestAccounts" });
        
        // Utiliser Metamask pour signer les transactions
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
    } else {
        alert("Please install Metamask");
    }
}

// Fonction pour ajouter un message
async function addMessage() {
    const message = document.getElementById("messageInput").value;
    try {
        const tx = await contract.addMessage(message);
        await tx.wait(); // Attendre la confirmation de la transaction
        alert("Message added successfully!");
    } catch (error) {
        console.error("Error adding message: ", error);
    }
}

// Fonction pour obtenir tous les messages
async function getAllMessages() {
    try {
        const messages = await contract.getAllMessages();
        document.getElementById("output").innerText = messages.join("\n");
    } catch (error) {
        console.error("Error fetching messages: ", error);
    }
}

// Fonction pour supprimer un message par index
async function deleteMessage() {
    const index = document.getElementById("deleteIndex").value;
    try {
        const tx = await contract.deleteMessage(index);
        await tx.wait(); // Attendre la confirmation de la transaction
        alert("Message deleted successfully!");
    } catch (error) {
        console.error("Error deleting message: ", error);
    }
}

// Fonction pour changer de propriétaire
async function changeOwner() {
    const newOwner = document.getElementById("newOwner").value;
    try {
        const tx = await contract.changeOwner(newOwner);
        await tx.wait(); // Attendre la confirmation de la transaction
        alert("Owner changed successfully!");
    } catch (error) {
        console.error("Error changing owner: ", error);
    }
}

// Charger Metamask à la connexion
window.onload = connect;

