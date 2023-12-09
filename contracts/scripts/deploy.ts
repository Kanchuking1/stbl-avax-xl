import { ethers } from "hardhat";

async function main() {
  const GenTokensFactory = await ethers.getContractFactory("GenTokens");
  const genTokens = await GenTokensFactory.deploy();

  await genTokens.waitForDeployment();

  console.log("GenTokens deployed to:", await genTokens.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
