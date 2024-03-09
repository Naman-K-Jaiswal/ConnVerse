import React from 'react';
import { useState } from 'react';
import './style2.css';
import registerImg from "./registration.png";
import { Link } from 'react-router-dom';
import MetaData from '../../../MetaData.jsx';
import ValidationIcon from '@mui/icons-material/TaskAlt';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

const CenterBox = () => {
  const navigate = useNavigate();
  const [showFirstForm, setShowFirstForm] = useState(true);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [validationCode, setValidationCode] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  const handleSubmitFirstForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: signUpEmail }),
      });

      if (response.status === 200){
        setShowFirstForm(false);
      } else {
        alert('Please enter valid Email')
      }
    } catch (error) {
      alert('Please enter valid Email');
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (signUpPassword !== signUpConfirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log(signUpPassword)
    const hashedPassword = CryptoJS.SHA256(signUpPassword).toString(CryptoJS.enc.Hex);

    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: signUpEmail, old_password: validationCode, new_password: hashedPassword }),
      });

      if (response.ok) {
        navigate('/home');
        alert('sign up successful');
      } else {
        console.error('Failed to validate OTP');
        return;
      }
    } catch (error) {
      console.error('Error validating OTP:', error);
      return;
    }
  }
  return (
    <>
      <MetaData title='SignUp' />
      <div className="center-box">
        <div className="container">
          <p className='Conn'>Conn</p>
          <p className='Verse'>Verse</p>
        </div>
        <img className = "signUpPageImage" src={registerImg} alt="Your GIF" style={{height: '33.33vh', float: 'left', top:'18vmax' }} />
        <div className="rectangular-box" style={{right: '3vw', width: '30vw', height: '50vh', borderRadius:'15px', backgroundColor: 'white', position: 'absolute', zIndex: '9999'}}>
            <div className="container" style={{left:'1.5vw',top:'0.5vh'}}>
              <p style={{fontSize:'20px', font:'Roboto'}}>Welcome To</p>
            </div>
            <div className="container" style={{left:'1.38vw',top:'3.33vh'}}>
              <p className='Conn' style={{fontSize:'30px'}}>Conn</p>
              <p className='Verse' style={{fontSize:'30px'}}>Verse</p>
            </div>
            {showFirstForm && (
              <form className='signUpForm' onSubmit={handleSubmitFirstForm}>
                <pre>Register</pre>
                <div className='line'></div>
                <div className='signUpEmail'>
                    <EmailIcon/>
                    <input 
                    type='email'
                    placeholder='Email'
                    required
                    value={signUpEmail}
                    onChange={(e)=>setSignUpEmail(e.target.value)}
                    />
                </div>
                <Link to='/alumn'>Are you an Alumn ?</Link>
                <input
                    type='submit'
                    value= 'Send OTP'
                    className='signUpBtn'
                    />
              </form>
              )
            }
            {!showFirstForm && (
              <form className='signUpForm' onSubmit={handleSignUp}>
                {/* <pre>Register</pre>
                <div className='line'></div> */}
                <div className='signUpEmail'>
                    <ValidationIcon/>
                    <input 
                    type='text'
                    placeholder='Validation Code'
                    required
                    value={validationCode}
                    onChange={(e)=>setValidationCode(e.target.value)}
                    />
                </div>
                <div className='signUpEmail'>
                    <LockOpenIcon/>
                    <input 
                    type='password'
                    placeholder='Password'
                    required
                    value={signUpPassword}
                    onChange={(e)=>setSignUpPassword(e.target.value)}
                    />
                </div>
                <div className='signUpEmail'>
                    <LockIcon/>
                    <input 
                    type='password'
                    placeholder='Confirm Password'
                    required
                    value={signUpConfirmPassword}
                    onChange={(e)=>setSignUpConfirmPassword(e.target.value)}
                    />
                </div>
                <Link to='/alumn'>Are you an Alumn ?</Link>
                <input
                    type='submit'
                    value= 'SIGN UP'
                    className='signUpBtn'
                    />
              </form>
            )}
        </div>
        <p className='about-us-head'>About Us</p>
        <p className="about-us">Welcome to ConnVerse – Your Gateway to Connection and Knowledge!<br></br>
        At ConnVerse, we believe in the power of shared experiences and the strength of community.
        Founded with the mission to bridge the gap between present students and esteemed Alumni of the<br></br>
          Indian Institute of Technology, Kanpur, ConnVerse serves as a dynamic platform for meaningful connections, insights, 
          and knowledge exchange.</p>
      </div>
    </>
  );
};


export default CenterBox;
