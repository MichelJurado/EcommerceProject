import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import {auth} from './firebase';

function Login() {

const navigate = useNavigate(); // useHistory but version 6 of react-router-dom
const [email,setEmail] = useState(''); //for an input it is recommend not to use null so I put an empty string instead
const [password, setPassword] = useState('');

const signIn = e => {
    e.preventDefault()//prevents the page from refreshing

    auth.signInWithEmailAndPassword(email,password)
    .then(auth =>{
        navigate('/')
    })
    .catch(error => alert(error.message))

    //firebase login

}

const register= e => {
    e.preventDefault() // prevents the page from refreshing we want it smooth when using react

    //firebase register
    auth.createUserWithEmailAndPassword(email,password)
    .then((auth) => {
        //it succesfully created a new user with email and password
        console.log(auth);
        if(auth){
            navigate('/');
        }
    })
    .catch(error => alert(error.message));
}

  return (
    <div className='login'>
        <Link to= '/' >
            <img className='login_logo' src ={require("./pictures/loginbanner.jpg")}/>
        </Link>

        <div className='login_container'>
            <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/> {/*onChange triggers when we have an event (e) e will then trigger the function to get the value of the input*/}

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

                    <button type='submit' onClick={signIn}
                    className='login_signInButton'>Sign In</button>

                    <button onClick={register}
                    className='login_registerButton'>Create an Account</button>
                </form>

        </div>
        
    </div>
  )
}

export default Login