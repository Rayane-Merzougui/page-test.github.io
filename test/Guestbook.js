const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Guestbook contract", function () {
  let Guestbook;
  let guestbook;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    Guestbook = await ethers.getContractFactory("Guestbook");
    [owner, addr1, addr2] = await ethers.getSigners();
    guestbook = await Guestbook.deploy();
  });

  it("Should set the right owner", async function () {
    expect(await guestbook.owner()).to.equal(owner.address);
  });

  it("Should add a message", async function () {
    const message = "Hello, blockchain!";
    await guestbook.connect(addr1).addMessage(message);
    const messages = await guestbook.getAllMessages();
    expect(messages[0]).to.equal(message);
  });

  it("Should emit NewMessage event when adding a message", async function () {
    const message = "Hello, Hardhat!";
    await expect(guestbook.connect(addr1).addMessage(message))
      .to.emit(guestbook, "NewMessage")
      .withArgs(addr1.address, message);
  });

  it("Should allow owner to delete a message", async function () {
    await guestbook.connect(addr1).addMessage("First message");
    await guestbook.connect(owner).deleteMessage(0);
    const messages = await guestbook.getAllMessages();
    expect(messages.length).to.equal(0);
  });

  it("Should fail if non-owner tries to delete a message", async function () {
    await guestbook.connect(addr1).addMessage("A message");
    await expect(guestbook.connect(addr1).deleteMessage(0))
      .to.be.revertedWith("Seul le proprietaire peut supprimer des messages");
  });
});
