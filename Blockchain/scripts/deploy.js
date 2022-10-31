const hre = require("hardhat");

async function main() {

  const Lock = await hre.ethers.getContractFactory("Time_lock");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log(
    `Deployed to ${lock.address}`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
