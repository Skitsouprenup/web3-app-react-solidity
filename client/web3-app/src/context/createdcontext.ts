import { createContext } from "react";

export interface TransactionFields {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
}

export interface BlockchainTransaction {
  addressTo: string;
  addressFrom: string;
  amount: string;
  message: string,
  timestamps: string,
  keyword: string
}


export const TransactionContext = 
  createContext<
    { 
      connectWallet: Function, 
      account: string,
      runTransaction: Function,
      loading: boolean,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>,
      transactions: Array<unknown>
    } | null
  >(null);