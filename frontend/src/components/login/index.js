import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../signup/index.css'
import LoginBtn from '../loginButton';
import LogoRound from '../../images/logo-rounded.png'
const Login = ()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const navigate = useNavigate();
    const handleSubmit = async (e) => {
       e.preventDefault();

       console.log(email, password);
       const data = {
           "email": email,
           "password": password
        };

       try {
           const response = await axios.post('http://localhost:4000/auth/login', data);
           localStorage.setItem('token', response.data.token);
           console.log("Logged in successfully");
        } catch (error) {
           console.log(error);
        }
    };
       return (
        <div>
        
        <div className='signup-form'>
        <div>
            <img src={LogoRound} alt="logo" />
        </div>
        <h1>Login</h1><br/>
        <form onSubmit={handleSubmit}>
            <div className='signup-container'>
                <label className='label' htmlFor="email">Email:</label>
                <input className='input-field email' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div><br/>

            <div className='signup-container'>
                <label className='label' htmlFor="name">Password:</label>
                <input className='input-field pass' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div><br/>
            <div className='signupp-btn'>
                <LoginBtn/>
            </div><br />
            <div className='signup-container'>
                <label className='label' htmlFor="name">Don't have an account?<a href='signup'>Signup</a></label>
            </div>
        </form>
        </div><br/>
        </div>
    );
}

export default Login;

