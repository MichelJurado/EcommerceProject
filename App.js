import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from "./home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import ThankYou from './ThankYou'
import Orders from './Orders';
import Address from './Address';


const promise = loadStripe('pk_test_51L2K7ALeYkaEcCPHwm7CKDID1gs7430RIjUjujBzaZO1e7L6017rC1Pa4s83XhQ9KJIC4YksgVqS259wZQWWmi0M00cXW1nDnL');

function App() {

  const [{},dispatch] = useStateValue();

  //creating a lister to know who is signed in 
  useEffect(() =>{
    //will only run once when the app component loads..every time a user changes it will refire the code

    auth.onAuthStateChanged(authUser => {
      console.log('The user is >>>', authUser);

      if(authUser){
        //the user just logged in / the user was logged in 

        dispatch({
          type:'SET_USER',
          user: authUser
        })

      } else{
        // the user is logged out

        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])

  return (
    //BEM

<Router>
<div className="app">
<Header/>
    <Routes>

      <Route path = "/orders" element={<Orders />} />
      <Route path = "/thankyou" element={<ThankYou />} />
      <Route path = "/login" element={<Login />} />
      <Route path = "/checkout" element={<Checkout />} />
      <Route path = "/address" element={<Address />} />
      <Route path = "/payment" element={
      <Elements stripe={promise}>
        <Payment />
      </Elements>} />
      
      <Route path = "/" element={<Home />} />
    </Routes>
</div>
</Router>

    
  );
}

export default App;
