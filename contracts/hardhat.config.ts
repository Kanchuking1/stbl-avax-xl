import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();
const config: HardhatUserConfig = {
  solidity: "0.8.21",
  networks: {
    fuji: {
      // gasPrice: 225000000000,
      // gas: 10000000,
      // gasMultiplier: 1.5,
      url: "https://avalanche-fuji-c-chain.publicnode.com",
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;
