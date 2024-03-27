import '@/styles/components/service.scss';

import { SlRefresh } from "react-icons/sl";
import { SlEnergy } from "react-icons/sl";
import { SlLock } from "react-icons/sl";

const services = [
  {
    id: 1,
    color: 'fuchsia',
    icon: <SlLock size={25}/>,
    title: 'Robust Security',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Fusce vel urna augue. Aenean porttitor eu lectus vitae scelerisque. 
    Vivamus tempor purus quis tortor fermentum aliquet.`
  },
  {
    id: 2,
    color: 'tomato',
    icon: <SlEnergy size={25}/>,
    title: 'Lightning Fast Transactions',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Fusce vel urna augue. Aenean porttitor eu lectus vitae scelerisque. 
    Vivamus tempor purus quis tortor fermentum aliquet.`
  },
  {
    id: 3,
    color: 'purple',
    icon: <SlRefresh size={25}/>,
    title: 'Great Exchange Rate',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Fusce vel urna augue. Aenean porttitor eu lectus vitae scelerisque. 
    Vivamus tempor purus quis tortor fermentum aliquet.`
  }
]

const Service = () => {
  return (
    <div className="service-container">
      <div className="left-side">
        <h1>
          Services that you'll truly
          enjoy and love!
        </h1>
      </div>

      <div className="right-side">
        {
          services.map((item) => (
            <div className='service-card' key={item.id}>
              <div className='service-icon'>
                <div 
                  className='circle' 
                  style={{backgroundColor: item.color}}
                >
                  {item.icon}  
                </div>
              </div>

              <div className='info'>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Service