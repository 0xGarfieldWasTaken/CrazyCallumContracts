const hre = require("hardhat");
const utils = require('ethers/utils')

async function main() {
  const crazycallum = await (await hre.ethers.getContractFactory("CrazyCallum")).attach("0x5B389Bb6BcF2b5f6B429E8fbcF8E406284a81375");

  console.log("Crazy Callum deployed to:", crazycallum.address);

  const tx = await crazycallum.tokenURI(0)
  console.log(tx)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });