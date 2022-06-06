import React, { useEffect } from 'react'
import './ThankYou.css';
import { useStateValue } from "./StateProvider";
import FinalSubtotal from './FinalSubtotal';
import Orders from './Orders';


function ThankYou() {

    const [{ cart, user }, dispatch] = useStateValue();
    

  return (
    <div className='ThankYou'>
        <h1 > Thank you for visiting, please shop with us again!</h1>

        <h3 className='summary'>
            Order Summary
        </h3>

        <div>
            <Orders />
            <FinalSubtotal/>

        </div>
        
    </div>
  )


}

export default ThankYou