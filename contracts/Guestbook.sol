// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

contract Guestbook {
    address public owner;
    string[] public messages; 
    event NewMessage(address indexed from, string message);
    event MessageDeleted(uint index);

    constructor() {
        owner = msg.sender; 
    }
    function addMessage(string calldata _message) external {
        messages.push(_message); 
        emit NewMessage(msg.sender, _message); 
    }
    function getAllMessages() external view returns (string[] memory) {
        return messages;
    }
    function deleteMessage(uint _index) external {
        require(msg.sender == owner, "Seul le proprietaire peut supprimer des messages");
        require(_index < messages.length, "Index invalide");
        messages[_index] = messages[messages.length - 1];
        messages.pop(); 

        emit MessageDeleted(_index); 
    }

    function changeOwner(address _newOwner) external {
        require(msg.sender == owner, unicode"Seul le propriétaire peut changer le propriétaire.");
        owner = _newOwner;
    }
}
