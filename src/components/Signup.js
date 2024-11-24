import React, { useState } from 'react';
import { app } from '../Firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [email,setEmail] = useState('');
    const [pwd,setPwd] = useState(null);
    const navigate = useNavigate();

    const signupHandler = (event) =>{
        event.preventDefault();
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth,email,pwd)
        .then(res=>{
            console.log(res.user);
            navigate('/login')
        })
        .catch(err=>{
            console.log(err);
        })
    }
  return (
    <div>
        <h1>Sign Up</h1>
        <form onSubmit={signupHandler}>
            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Email' />
            <input onChange={(e)=>{setPwd(e.target.value)}} type="password" placeholder='Password' />
            <button type='submit'>Signup</button>
        </form>
    </div>
  )
}

export default Signup