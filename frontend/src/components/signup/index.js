import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './index.css'
import SignupBtn from '../SignupButton';
import LogoRound from '../../images/logo-rounded.png'
const Signup = ()=>{

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

const handleSubmit = async (e) => {
       e.preventDefault();

        console.log(name, email, password)
        const data = {
            "name": name,
            "email": email,
            "password": password
        }

        try {
            const response = await axios.post('http://localhost:4000/auth/register', data);
            localStorage.setItem('token', response.data.token);
            console.log("success")
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
        <h1>Create Account</h1><br/>
        <form onSubmit={handleSubmit}>
            <div className='signup-container'>
                <label className='label' htmlFor="name">Name:</label>
                <input className='input-field name' type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            </div><br/>

            <div className='signup-container'>
                <label className='label' htmlFor="email">Email:</label>
                <input className='input-field email' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div><br/>

            <div className='signup-container'>
                <label className='label' htmlFor="name">Password:</label>
                <input className='input-field pass' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div><br/>
            <div className='signupp-btn'>
                <SignupBtn/>
            </div><br />
            <div className='signup-container'>
                <label className='label' htmlFor="name">Already have an account?<a href='login'>Login</a></label>
            </div>
        </form>
        </div><br/>
    </div>
    );
}

export default Signup;