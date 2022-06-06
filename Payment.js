import userEvent from '@testing-library/user-event'
import React, {useState,useEffect}from 'react'
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import CurrencyFormat from "react-currency-format";
import { getCartTotal } from "./reducer";
import {useStateValue} from "./StateProvider";
import {Link,useNavigate, Navigate} from "react-router-dom";
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js"
import axios from "./axios"
import {db} from "./firebase";
import Address from './Address';


function Payment() {
    const [{ cart, user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeded, setSucceeded] = useState(false);
    const [processing,setProcessing] = useState("");

    const [error,setError] = useState(null);
    const [disabled,setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    const [street,setStreet] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [zip,setZip] = useState('');

    console.log('hello')


    useEffect (() => {
        //generate the special stripe secret which allows us to charge a customer 

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //stripe expects the total in a currencies subunits
                //if you are expecting 10 dollars you will see 10,000
                url: `/payments/create?total=${getCartTotal(cart) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    },[cart])

    // console.log('The secret is your ',clientSecret)

    const handleSubmit = async (event) => {
        //stripe 
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent,address}) => {
            //paymentIntent = payment confirmation
            
                db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.uid)
            .set({
                cart:cart,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            // db.collection('users')
            // .doc(user?.uid)
            // .collection('address')
            // .doc(address)
            // .set({
            //     street:street,
            //     city: city,
            //     state:state,
            //     zip:zip
                
                
            // })


            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_CART'
            })

            
            
            navigate('/address');
        })
    }

    const handleChange = event => {
        //listen for changes in the card element 
        //and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    // function getStreet(val){
    //     setStreet(val.target.value)
    //     console.log(val.target.value) //gets the value of input
    // }

  return (
    <div className='payment'>
       <div className='payment_container'>

            <h1>
                Checkout (<Link to="/checkout">
                    {cart?.length} items
                    </Link>)
            </h1>

           {/* payment section- delivery address */}
           <div className='payment_section'>
                <div className='payment_title'>
                    <h3>{user?.email}</h3>

                    {/* <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>Street Address</p>
                        <input className='Street_Address'
                        // onChange={getStreet}
                        value={street}
                        onChange={e => setStreet(e.target.value)}> 

                        </input>

                        <p>City</p>
                        <input className='City_Address'
                        value={city}
                        onChange={e => setCity(e.target.value)}> 

                        </input>

                        <p>State</p>
                        <input className='State'
                        value={state}
                        onChange={e => setState(e.target.value)}> 

                        </input>

                        <p>Zip</p>
                        <input className='Zip'
                        value={zip}
                        onChange={e => setZip(e.target.value)}> 

                        </input>
                    </div> */}
                    
                </div>
           </div>
            
            

           {/* payment section- review items */}
           <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment_items'>
                    {cart.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
           </div>
                
           {/* payment section- payment method */}
           <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment_details'>
                        {/* stripe will go here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement 
                            onChange={handleChange}/>

                            <div className='payment_priceContainer'>
                                <CurrencyFormat
                                renderText={(value) =>(
                                    <>
                                        <p>
                                            Subtotal ({cart.length} items): <strong>{value}</strong>
                                        </p>
                                        
                                    </>
                                )}
                                decimalScale={2}
                                value={getCartTotal(cart)} 
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeded}>
                                    <span>{processing ? <p> processing</p> : "Buy now"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error &&  <div>{error}</div>}
                        </form>
                </div>
           </div>

        </div> 
    </div>
  )
}

export default Payment