const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Crazy Callums", function () {

  let crazycallum
  let owner
  let addr1

  let price1 = ethers.utils.parseEther("0.005")
  let price2 = ethers.utils.parseEther("0.010")
  let price4 = ethers.utils.parseEther("0.020")

  let pricediscount2 = ethers.utils.parseEther("0.005")
  let pricediscount4 = ethers.utils.parseEther("0.015")

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    CrazyCallum = await ethers.getContractFactory("CrazyCallum");
    crazycallum = await CrazyCallum.deploy();
    await crazycallum.deployed();

    await crazycallum.unpause()
  });

  describe("Minting", function () {
    it("Should deploy", async function () {

      console.log(`Crazy Callum Deployed at ${crazycallum.address}`)
      assert(crazycallum.address)

    });

    it("Should be able to free mint and then not again", async function () {

      const mintFree = await crazycallum.connect(owner).freeMintCallum()
      await mintFree.wait()

      const balance = hre.ethers.utils.formatUnits(await crazycallum.balanceOf(owner.address), 0)
      console.log(balance)

      expect(balance).to.equal('1')

      try {
        const mintAgain = await crazycallum.connect(owner).freeMintCallum()
        await mintAgain.wait()

        assert.fail("The transaction should have thrown an error");

      } catch (err){

        assert.include(err.message, "revert", "The error message should contain 'revert'");

      }
    });

    it("Should be able to free mint and then paid mint", async function () {

      const mintFree = await crazycallum.connect(owner).freeMintCallum()
      await mintFree.wait()

      let balance = hre.ethers.utils.formatUnits(await crazycallum.balanceOf(owner.address), 0)
      console.log(balance)

      expect(balance).to.equal('1')

      const mintAgain = await crazycallum.connect(owner).mintCallum({value: price1})
      await mintAgain.wait()

      balance = hre.ethers.utils.formatUnits(await crazycallum.balanceOf(owner.address), 0)
      console.log(balance)

      expect(balance).to.equal('2')
    });

    it("Should be able to purchase 2 callums for 0.005 ether", async function () {

      const mintFree = await crazycallum.connect(owner).mint2CallumSupportingFreeMint({value: price1})
      await mintFree.wait()

      let balance = hre.ethers.utils.formatUnits(await crazycallum.balanceOf(owner.address), 0)
      console.log(balance)

      expect(balance).to.equal('2')
    });

    it("Should be able to purchase 4 callums for 0.015 ether", async function () {

      const mintFree = await crazycallum.connect(owner).mint4CallumSupportingFreeMint({value: pricediscount4})
      await mintFree.wait()

      let balance = hre.ethers.utils.formatUnits(await crazycallum.balanceOf(owner.address), 0)
      console.log(balance)

      expect(balance).to.equal('4')
    });

    it("Should be able to purchase more than totalSupply", async function () {

      const mintFree = await crazycallum.connect(owner).mint4CallumSupportingFreeMint({value: pricediscount4})
      await mintFree.wait()

      let balance = hre.ethers.utils.formatUnits(await crazycallum.balanceOf(owner.address), 0)
      console.log(balance)

      expect(balance).to.equal('4')

      try {
        const mintAgain = await crazycallum.connect(owner).mintCallum({value: price1})
        await mintAgain.wait()

        assert.fail("The transaction should have thrown an error");

      } catch (err){

        assert.include(err.message, "revert", "The error message should contain 'revert'");

      }
    });

  });

});
