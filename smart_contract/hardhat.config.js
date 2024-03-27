require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const {SEPOLIA_URL, SECRET_KEY} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [SECRET_KEY]
    }
  }
};
