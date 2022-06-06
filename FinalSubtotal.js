import React from 'react'
import "./FinalSubtotal.css"
import { useNavigate } from "react-router-dom";


function FinalSubtotal() {
  const navigate = useNavigate();

  return (
    <div className='final_subtotal'>
      

            <button onClick={e => navigate('/')}>Continue shopping</button>
    </div>
  )
}

export default FinalSubtotal