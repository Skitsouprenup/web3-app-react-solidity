import '@/styles/components/navbar.scss'
import { useState } from 'react'

const Navbar = () => {
  const [selectedLink, setSelectedLink] = useState<number>(0)

  return (
    <div
      className='navbar-container'
    >
      <div className='brand-content'>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" 
          alt="brand"
          width="50px"
          height="50px" 
        />

        <h1>Web3App</h1>
      </div>

      <div className='links'>
        <h4 
          className={selectedLink === 0 ? 'selected-link' : ''}
          onClick={() => setSelectedLink(0)}
        >
          Wallets
        </h4>
        <h4 
          className={selectedLink === 1 ? 'selected-link' : ''}
          onClick={() => setSelectedLink(1)}
        >
          Exchange
        </h4>
        <h4 
          className={selectedLink === 2 ? 'selected-link' : ''}
          onClick={() => setSelectedLink(2)}
        >
          Market
        </h4>
      </div>
    </div>
  )
}

export default Navbar