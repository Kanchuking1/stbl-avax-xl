import { ethers } from "hardhat";
import { GenTokens } from "../typechain-types";

async function main() {
  const GenTokensFactory = await ethers.getContractFactory("GenTokens");
  const genTokens: GenTokens = await GenTokensFactory.attach(
    "0x9D1aCC182e759B25689a8bd509d7d7307067d120"
  );

  console.log(await genTokens.owner());
  const result = await genTokens.generateImage(
    "Scenic view of a beach at sunset",
    {
      value: ethers.parseEther("0.01"),
    }
  );
  console.log(await result.wait());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
