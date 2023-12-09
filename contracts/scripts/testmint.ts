import { ethers } from "hardhat";
import { GenTokens } from "../typechain-types";

async function main() {
  const GenTokensFactory = await ethers.getContractFactory("GenTokens");
  const genTokens: GenTokens = await GenTokensFactory.attach(
    "0x9D1aCC182e759B25689a8bd509d7d7307067d120"
  );

  console.log(
    await genTokens.getUserGenRequests(
      "0xE2Ccad70370800c5319261Be716B41732F802f62"
    )
  );

  const result = await genTokens.mint("0", {
    value: ethers.parseEther("0.01"),
  });
  console.log(await result.wait());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
