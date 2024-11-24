import React, { useState } from 'react';
import { app } from '../Firebase';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email,setEmail] = useState('');
    const [pwd,setPwd] = useState(null);
    const navigate = useNavigate();

    const loginHandler = (event) =>{
       event.preventDefault();
       const auth = getAuth(app);
       signInWithEmailAndPassword(auth,email,pwd)
       .then(res=>{
        console.log(res.user);
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
        </form>
    </div>
  )
}

export default Login