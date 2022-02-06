const hre = require("hardhat");

async function main() {
  const CrazyCallum = await hre.ethers.getContractFactory("CrazyCallum");
  const crazycallum = await CrazyCallum.deploy();

  await crazycallum.deployed();

  console.log("Crazy Callum deployed to:", crazycallum.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
