import '@/styles/components/credentials.scss';

import { SiEthereum } from "react-icons/si";
import { useContext, useState } from 'react';
import { TransactionContext, TransactionFields } from '@/context/createdcontext';
import { shortenAccountId } from '@/utils/utilities';
import Loader from './Loader';

const transactionFieldsDefaultValues = {
  addressTo: '',
  amount: '',
  keyword: '',
  message: ''
}

const Credentials = () => {
  const context = useContext(TransactionContext);
  const[transactionFields, setTransactionFields] = 
    useState<TransactionFields>(transactionFieldsDefaultValues);


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    name: string
  ) => {

    setTransactionFields((prevState) => ({
      ...prevState,
      [name]: event.target.value
    }))
  }

  const connectWallet = () => {
    if(context) {
      context.connectWallet()
    }
  }

  const handleSubmit = () => {
    if(context) {
      const { addressTo, amount, keyword, message } = transactionFields;

      if(addressTo && amount && keyword && message) {
        context.runTransaction(transactionFields);
        setTransactionFields(transactionFieldsDefaultValues);
      }
    }
  }

  return (
    <div className='credentials-container'>
      <div className='left-section'>
        
        <div className='connect-wallet-section'>
          <p>
            This app is 100% secure, reliable
            and fast. Receive and send crypto
            coins with low fees!
          </p>

          {
            !context?.account &&
            <button
              onClick={() => connectWallet()} 
              className='connect-wallet-btn'
            >
              Connect Wallet
            </button>
          }
        </div>

        <div className='feature-table-container'>
          <div className='feature-table-section'>
            <div className='grid-item'>Quick</div>
            <div className='grid-item'>Reliable</div>
            <div className='grid-item'>Secure</div>
            <div className='grid-item'>Low Fees</div>
            <div className='grid-item'>24/7</div>
            <div className='grid-item'>Smooth</div>
          </div>
        </div>
      </div>

      <div className='right-section'>
        <div className='crypto-card'>
          <div className='card'>

            <div className='left-circle-container'>
              <div className='left-circle'>
                <SiEthereum size={40} color='goldenrod'/>
              </div>
            </div>

            <div className='card-info'>
              <p>{shortenAccountId(context?.account)}</p>
              <h3>Ethereum</h3>
            </div>

          </div>
        </div>

        <div className='form-container'>
          <div className='send-crypto-form'>
            <div className='input-fields'>
              <input
                className='input-field' 
                type="text" 
                placeholder="Receiver's Address"
                value={transactionFields?.addressTo}
                onChange={(e) => handleChange(e, 'addressTo')}
                disabled={context?.loading || context?.account === ''}
              />
              <input
                className='input-field' 
                type="number"
                step="0.0001"
                min="0"
                placeholder="Amount (ETH)"
                value={transactionFields?.amount}
                onChange={(e) => handleChange(e, 'amount')}
                disabled={context?.loading || context?.account === ''}
              />
              <input
                className='input-field' 
                type="text" 
                placeholder="Keyword (GIF)"
                value={transactionFields?.keyword}
                onChange={(e) => handleChange(e, 'keyword')}
                disabled={context?.loading || context?.account === ''}
              />

              <textarea 
                placeholder='Message...'
                className='input-field'
                style={{resize: 'none', fontFamily: 'inherit'}}
                value={transactionFields?.message}
                onChange={(e) => handleChange(e, 'message')}
                disabled={context?.loading || context?.account === ''}
              ></textarea>
            </div>

            <div className='separator'></div>

            {
              context?.loading ? <Loader /> : (
                <button
                  onClick={() => handleSubmit()} 
                  className='send-crypto-btn'
                  disabled={context?.account === ''}
                >
                  Send
                </button>
              )
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default Credentials