import '@/styles/components/transaction.scss';
import { useContext } from "react";

import { BlockchainTransaction, TransactionContext } from "@/context/createdcontext";
import { useFetchGiphy } from "@/hooks/useFetchGiphy";
import { shortenAccountId } from '@/utils/utilities';

const TransactionCard = (
  {transaction}:
  {transaction: BlockchainTransaction}
) => {
  const gifUrl = useFetchGiphy({keyword: transaction?.keyword})
  return (
    <div className='transaction-card-container'>
      <div className='transaction-card-info'>
        <p>
          <a 
            href={`https://sepolia.etherscan.io/address/${transaction?.addressTo}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>Sender: </span>{shortenAccountId(transaction?.addressTo)}
          </a>
        </p>
        <p>
          <a 
            href={`https://sepolia.etherscan.io/address/${transaction?.addressFrom}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>Receiver: </span>{shortenAccountId(transaction?.addressFrom)}
          </a>
        </p>
        <p>
          <span>Amount: </span>{transaction?.amount} eth
        </p>
        <p>
          <span>Created at: </span>{transaction?.timestamps}
        </p>
      </div>
      <img alt="gif" src={gifUrl} className='image'/>
    </div>
  )
}

const Transaction = () => {
  const transactionContext = useContext(TransactionContext);

  return (
    <div className='transaction-container'>

      <h1 className='header'>Latest Transactions</h1>

      <div className='transaction-cards'>
        {
          transactionContext?.transactions ? 
            transactionContext.transactions.length > 0 ?
            transactionContext.transactions.map((item, index) => {
              const transaction = item as BlockchainTransaction

              return <TransactionCard transaction={transaction} key={index}/>
            }) : <h2>No Transactions</h2>
          : <h2>No Transactions</h2>
        }
      </div>
    </div>
  )
}

export default Transaction