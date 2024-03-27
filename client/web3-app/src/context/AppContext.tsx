import { MetaMaskInpageProvider } from "@metamask/providers";
import { ReactNode, useEffect, useState } from "react";
import { abi, contractAddress } from '@/utils/transactions/constants';

import { ContractTransactionResponse, ethers } from 'ethers';
import { Maybe } from "node_modules/@metamask/providers/dist/types/utils";
import { TransactionContext, TransactionFields } from "./createdcontext";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

const { ethereum } = window;

let signer = null;
let provider;
const getEthereumContract = async () => {
  if (ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider();
    return null;
  }
  else {
    provider = new ethers.BrowserProvider(ethereum)
    signer = await provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, abi, signer);
    return transactionContract;
  }
}

export const TransactionProvider = ({ children } : { children: ReactNode }) => {
  const[account, setAccount] = useState<string>('none');
  const[loading, setLoading] = useState<boolean>(false);
  const[transactions, setTransaction] = useState<Array<unknown>>([])

  const getTransactions = async () => {
    let transactions: Array<unknown> = [];

    try {
      if(!ethereum) {
        alert("This app requires metamask. Please install it.");
        return transactions;
      }

      setLoading(true);
      const contract = await getEthereumContract();
      if(contract) {
        const fetched: Array<Array<unknown>> = 
          await contract.getFunction('getAllTransactions').call(null);

        transactions = fetched.map((item) => {
          let time = item[4] as bigint;
          //We acquired this value from block.timestamp
          //in solidity and block.timestamp is in seconds.
          //Thus, we need to convert the value to milliseconds.
          time = time * 1000n;

          const amountBigInt = item[2] as bigint;

          return {
            addressTo: item[0],
            addressFrom: item[1],
            //Remember that the ether we sent to our blockchain
            //is in 18 units or multiplied by 1*10^18.
            //To convert our ether to its original value,
            //we need to divide the value that we pull out
            //from the blockchain by 1*10^18 or use
            //the formatEther() utility function provided
            //by ethers.js
            amount: ethers.formatEther(amountBigInt),
            message: item[3],
            timestamps: new Date(Number(time.toString())).toLocaleString(),
            keyword: item[5]
          };

        })
      }
      setLoading(false);

      return transactions.reverse();
    }
    catch(error) {
      console.log("No Ethereum Object.");
      console.error(error);
    }
    return transactions;
  }

  const walletConnected = async () => {
    try {
      if(!ethereum) {
        alert("This app requires metamask. Please install it.");
        return;
      }
      setLoading(true);

      //Get connected accounts
      const accounts: Array<string> = 
        await ethereum.request({ method: 'eth_accounts' }) as Array<string>
      
      if(accounts.length > 0) {
        //Set first account as current account
        setAccount(accounts[0])
        await getTransactionCount();
        const transactions = await getTransactions();
        setTransaction(transactions);
      } else {
        setAccount('');
        console.log('no connected account/s found.');
      }
    }
    catch(error) {
      console.log("No Ethereum Object.");
      console.error(error);
    }
  }

  const connectWallet = async () => {
    try {
      if(!ethereum) {
        alert("This app requires metamask. Please install it.");
        return;
      }

      setLoading(true);
      //Request account
      const accounts: Maybe<String[]> = 
        await ethereum.request({ method: 'eth_requestAccounts' });
      //console.log(accounts)

      //Set first account as current account
      setAccount(accounts ? accounts[0] as string : '' )
      const transactions = await getTransactions();
      setTransaction(transactions);

    } catch(error) {
      console.log("No Ethereum Object.");
      console.error(error);
      const e = error as { code: number }
      
      if(e?.code === -32002) {
        alert('Metamask is already requesting for your account.' +
        ' Open your browser extension and look for metamask. Then,' +
        ' login your account there.');
      }
    }

    setLoading(false);
  }

  const getTransactionCount = async () => {
    try {
      if(!ethereum) {
        alert("This app requires metamask. Please install it.");
        return;
      }

      setLoading(true);

      const contract = await getEthereumContract();
      if(contract) {
        const transactionCount = 
          await contract.getFunction('getTransactionCount').call(null);
        localStorage.setItem('transactionCount', transactionCount);
      }
    }
    catch(error) {
      console.log("No Ethereum Object.");
      console.error(error);
    }

    setLoading(false);
  }

  const runTransaction = async (transactionFields:TransactionFields) => {
    try {
      if(!ethereum) {
        alert("This app requires metamask. Please install it.");
        return;
      }

      setLoading(true);
      const { addressTo, amount, keyword, message } = transactionFields;

      const contract = await getEthereumContract();

      //Convert ether to 18 unit number. In other words,
      //multiply ether by 1x10^18.
      //This is ensure that the ether that is gonna be
      //transported to blockchain is in uint256 format.
      //In the addToBlockChain method in our contract,
      //the amount parameter there is in uint256 datatype
      //or uint256 as a shorthand.
      const parsedAmount = ethers.parseEther(amount);

      if(contract) {
        //List available function
        //console.log("FUNCTIONS", contract.interface.forEachFunction((f)=>console.log(f)))
        
        //gas and value uses gwei unit. This unit is
        //a denomination of ether. In other words,
        //it's smaller value of ether, like coins from note.
        //Execute first transaction to metamask
        await ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: account,
            to: addressTo,
            gas: '0x5208', //21000 gwei
            //value must be an integer. In other words,
            //no decimal fraction. Metamask recognizes
            //ether*1x10^18 format and it must be in hex 
            //format. Thus, we use parseEther() first
            //then convert the result to hex using
            //toBeHex(). Then, metamask converts the
            //value back to its original form and
            //send to an account if it's confirmed.
            value: ethers.toBeHex(parsedAmount)
          }]
        })

        //This will prompt another metamask transaction. Once the
        //first transaction is complete we can confirm this transaction.
        //This transaction just execute our contract function and
        //it doesn't send any ether execept for the gas fees.
        //Remember that every operation we do to the blockchain has
        //gas fees.
        const transaction: ContractTransactionResponse = 
          await contract.getFunction('addToBlockchain').
          call(
            null,
            addressTo, 
            parsedAmount,
            message, 
            keyword
          );
        
        //console.log(transaction);

        await transaction.wait();

        const transactionCount = 
          await contract.getFunction('getTransactionCount').call(null);
        localStorage.setItem('transactionCount', transactionCount);

        const transactions = await getTransactions();
        setTransaction(transactions);
      }
    }
    catch(error) {
      console.log("No Ethereum Object.");
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    const init = async() => {
      await walletConnected();
      setLoading(false);
    }
    init();
  },[]);

  return (
    <TransactionContext.Provider 
      value={{ 
        connectWallet, 
        account,
        runTransaction,
        loading,
        setLoading,
        transactions
      }}
    >
    {children}
  </TransactionContext.Provider>
  )
}