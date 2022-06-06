import React, {useState} from 'react'
import './Order.css'
import moment from "moment";
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import userEvent from '@testing-library/user-event';
import {useStateValue} from "./StateProvider";




function Order({order}) {


  console.log(`This is order ${order.id}`)
  
  // console.log(`This is  ${address.city}`)

  return (
    <div className='order'>
        <h2>Order - {order.id}</h2>
        
        <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}
        </p>
        {order.data.cart?.map(item => (
            <CheckoutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            hideButton
            />
        ))}

        


<CurrencyFormat
            renderText={(value) =>(
               <h3 className='order_total'>Order Total: {value}</h3>
            )}
            decimalScale={2}
            value={order.data.amount / 100} 
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            />

         


    </div>
  )
}



export default Order