import React from 'react';
import { useState } from 'react';
import IITKlogo from './Images/IITK_logo.png';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EmailIcon from '@mui/icons-material/Email';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Leftbox = () => {
    const [alumnEmail, setAlumnEmail] = useState('');
    const [alumnName, setAlumnName] = useState('');
    const [alumnBatch, setAlumnBatch] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Display alert message
        alert("We'll reach back to you soon!");
        // Redirect to login page
        navigate("/login");
    };
    return (
        <div className='everything'>
            <div className="container1">
                <p className='Conn1'>Conn</p>
                <p className='Verse1'>Verse</p>
            </div>
            <div className="line1"></div>
            <h1 className="alumhead1" style={{ marginBottom: '0.1vmax' }}>Greetings, Alum!</h1>
            <span className='alumline1'>Welcome to Connverse Community.</span>
            <form className='signUpAlumnForm' onSubmit={handleSubmit}>
                <pre>Register</pre>
                <div className='line'></div>
                <div className='signUpAlumnEmail'>
                    <HowToRegIcon/>
                    <input 
                    type='text'
                    placeholder='Name'
                    required
                    value={alumnName}
                    onChange={(e)=>setAlumnName(e.target.value)}
                    />
                </div>
                <div className='signUpAlumnEmail'>
                    <EmailIcon/>
                    <input 
                    type='email'
                    placeholder='Email'
                    required
                    value={alumnEmail}
                    onChange={(e)=>setAlumnEmail(e.target.value)}
                    />
                </div>
                <div className='signUpAlignEmail'>
                    <PeopleAltIcon/>
                    <input 
                    type='text'
                    placeholder='Batch (YYYY)'
                    required
                    value={alumnBatch}
                    onChange={(e)=>setAlumnBatch(e.target.value)}
                    />
                </div>
                <Link to='/login'>Already have an account ?</Link>
                <input
                    type='submit'
                    value= 'SIGN UP'
                    className='signUpAlumnBtn'
                    />
            </form>
            <img className='iitklogo1' src={IITKlogo} alt="IITK Logo" />
            <p className='copyright1'>&copy; 2024 MahaDevs. All rights reserved.</p>
        </div>
    );
};

export default Leftbox;