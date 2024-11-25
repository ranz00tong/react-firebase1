import React, { useState } from 'react';
import { app } from '../Firebase';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email,setEmail] = useState('');
    const [pwd,setPwd] = useState(null);
    const [phone,setPhone] = useState(null);
    const [isOtp,setIsOtp] = useState(false);
    const [code,setCode] = useState('');
    const navigate = useNavigate();

    const loginHandler = (event) =>{
       event.preventDefault();
       const auth = getAuth(app);
       signInWithEmailAndPassword(auth,email,pwd)
       .then(res=>{
        console.log(res.user);
        localStorage.setItem('isLogin',true);
        console.log(localStorage.getItem('isLogin'))
        navigate('/dashboard')
       })
       .catch(err=>{
        console.log(err);
       })
    }

    const LoginWithGoogle = (event) =>{
        event.preventDefault();
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
        .then(res=>{
            console.log(res);
            navigate('/dashboard');
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const LoginWithFacebook = (event) =>{
        event.preventDefault();
        const auth = getAuth(app);
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth,provider)
        .then(res=>{
            console.log(res);
            navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const OtpHandler = () =>{
        const auth = getAuth(app);
        const appVerifier = new RecaptchaVerifier(auth, 'abc', {'size':'invisible'});
        signInWithPhoneNumber(auth,phone,appVerifier)
        .then(res=>{
            window.confirmationResult = res;
            console.log('otp sent');
            console.log(res);
            setIsOtp(true);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const confirmOtp = () =>{
        window.confirmationResult.confirm(code)
        .then(res=>{
            console.log(res);
            navigate('/dashboard');
        })
        .catch(err=>{
            console.log(err);
        })
    }
  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={loginHandler}>
            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Email' />
            <input onChange={(e)=>{setPwd(e.target.value)}} type="password" placeholder='Password' />
            <button type='submit'>Login</button>
            <br />
            <br />
            <button type='button' onClick={LoginWithGoogle}>Login with Google</button>
            <button type='button' onClick={LoginWithFacebook}>Login with Facebook</button>
            <br />
            <br />
            {!isOtp?
            <div>
            <h3>Login with OTP</h3>
            <input onChange={(e)=>{setPhone(e.target.value)}} type="text" placeholder='phone number'/>
            <div id='abc'></div>
            <button type='button' onClick={OtpHandler}>send otp</button>
            </div>
            :
            <div>
                <h3>confirm otp</h3>
                <input onChange={(e)=>{setCode(e.target.value)}} type="text" />
                <button type='button' onClick={confirmOtp}>confirm</button>
            </div>
            }
         
        </form>
    </div>
  )
}

export default Login