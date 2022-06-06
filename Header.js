 import React from 'react';
 import './Header.css';
 import {Link} from "react-router-dom";
 import {useStateValue} from "./StateProvider";
 import {auth} from "./firebase";
 
 function Header() {
    const [{cart, user },dispatch] = useStateValue();

    const handleAuthentication = () => {
        if(user) {
            auth.signOut();
        }

    
    }

   return (
     <div className='header'>
         <Link to="/">
            <div className='business_name'>
                <div className='name'>Cuban Jewelers</div>
            </div>
         </Link>
         
        
         

        <div className='header_nav'>
           <Link to={!user && '/login'}> {/*Only if not logged in will it take you to login page when you click if you are signed in and click log out you will just get signed out and stay on the same page */}
                <div onClick={handleAuthentication} className='header_option'>
                    <span className='header_optionLineOne'>{user ? `Hello, ${user.email}` : 'Hello Guest'}</span>
                    <span className='header_optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
                </div>
            </Link>

        <Link to= '/orders'>
            {user ? <div className="header_option">
                <span className="header_optionLineOne">Returns</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div> : "" // will not show returns and orders if user is not logged in 
            }
            
        </Link>
          
    

            <Link to="/checkout">
                {user ? 
                <div className='Cart'>   
                <img 
                className='cart_logo'
                src={require("./pictures/cart.png")}
                />
                <span className='header_optionLineTwoheader_cartCount'>{cart?.length}</span>
            </div> : ''}
                {/* <div className='Cart'>   
                    <img 
                    className='cart_logo'
                    src={require("./pictures/cart.png")}
                    />
                    <span className='header_optionLineTwoheader_cartCount'>{cart?.length}</span>
                </div> */}
            </Link>
            

        </div>

         
     </div>
   );
 }
 
 export default Header