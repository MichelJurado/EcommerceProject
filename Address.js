import React from 'react'
import './Address.css';
import {useStateValue} from "./StateProvider";

function Address() {

    const [{ cart, user }, dispatch] = useStateValue();

  return (
    <div>

<head>
    <link rel = "stylesheet" type="text/css" href="style3.css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
    
</head>
        <div>

            <div >
                <h1 className='Address-confirmation'>
                    Your order has been placed please provide your address for this order.
                </h1>
            </div>
        <div class="intro">

<div class="wrapper">
  
            <form action="https://formsubmit.co/meganmarianeeslamejor@gmail.com" method="POST">
                <div class="dbl-field">
                    <div class="field">
                        <input type="text" name="name" placeholder="Enter your name"/>
                        
                        </div>

                        <div class="field">
                        <input type="email" name="email" value= {user?.email}/>
                        
                        </div>
                </div>

                <div class="dbl-field">
                    <div class="field">
                        <input type="text" name="phone" placeholder="Enter your phone"/>
                        
                        </div>

                        <div class="field">
                        <input type="text" name="organization" placeholder="Enter your address"/>
                        
                        </div>

                        
                </div>
                    
                

                    <div class="button-area">
                        <button type="submit">Send </button>
                        
                    </div>

                    <input type="hidden" name="_next" value="https://ecommerce-app-5a7a6.web.app/thankyou"></input>
                    <input type="hidden" name="_autoresponse" value="We have received your order and will ship it out within 3-5 business days"></input>
                    <input type="hidden" name="_subject" value="Order Received!"></input>
                    
                    
            </form>
            </div>

            </div>
        </div>
        

    </div>
  )
}

export default Address