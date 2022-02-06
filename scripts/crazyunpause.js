const hre = require("hardhat");
const utils = require('ethers/utils')

async function main() {
  const crazycallum = await (await hre.ethers.getContractFactory("CrazyCallum")).attach("0xF371a307bE9a8BdB5427e0d8568366f13036455c");

  console.log("Crazy Callum deployed to:", crazycallum.address);
  await crazycallum.unpause()

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });