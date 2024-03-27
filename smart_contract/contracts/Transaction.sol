// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Transaction {
  uint transactionCounter;

  event Transfer(
    address from, 
    address to, 
    uint amount, 
    string message, 
    uint timestamp, 
    string keyword
  );

  struct TransferStructure {
    address from; 
    address to; 
    uint amount; 
    string message; 
    uint timestamp; 
    string keyword;
  }

  TransferStructure[] transactions;

  function addToBlockchain(
    address payable receiver, 
    uint amount,
    string memory message,
    string memory keyword
  ) public {
    transactionCounter += 1;
    transactions.push(TransferStructure(
      msg.sender, 
      receiver,
      amount,
      message,
      block.timestamp,
      keyword
    ));

    //commit transaction
    emit Transfer(
      msg.sender, 
      receiver,
      amount,
      message,
      block.timestamp,
      keyword
    );
  }

  function getAllTransactions() public view returns (TransferStructure[] memory) {
    return transactions;
  }

  function getTransactionCount() public view returns (uint) {
    return transactionCounter;
  }
}