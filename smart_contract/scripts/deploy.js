const hre = require("hardhat");

const main = async () => {
  const Transaction = await hre.ethers.getContractFactory("Transaction");
  const transaction = await Transaction.deploy();

  await transaction.waitForDeployment();

  const address = await transaction.getAddress();
  console.log("Transaction is deployed to:", address);
};

const initMain = async () => {
  try {
    await main();
  }catch(e) {
    console.error(e);
  }
};
initMain();