import React from 'react';
import { useState } from 'react';
import './style2.css'; // Import the CSS file
import registerImg from "./registration.png";
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import MetaData from '../../../MetaData.jsx';

const CenterBox = () => {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  return (
    <>
      <MetaData title='Login' />
      <div className="center-box">
        <div className="container">
          <p className='Conn'>Conn</p>
          <p className='Verse'>Verse</p>
        </div>
        <div className="rectangular-box" style={{right: '3vw', width: '30vw', height: '50vh', borderRadius:'15px', backgroundColor: 'white', position: 'absolute', zIndex: '9999'}}>
            <div className="container" style={{left:'1.5vw',top:'0.5vh'}}>
              <p style={{fontSize:'20px', font:'Roboto'}}>Welcome To</p>
            </div>
            <div className="container" style={{left:'1.38vw',top:'3.33vh'}}>
              <p className='Conn' style={{fontSize:'30px'}}>Conn</p>
              <p className='Verse' style={{fontSize:'30px'}}>Verse</p>
            </div>
            <form className='loginForm'>
              <div className='loginEmail'>
                  <EmailIcon/>
                  <input 
                  type='email'
                  placeholder='Email'
                  required
                  value={loginEmail}
                  onChange={(e)=>setLoginEmail(e.target.value)}
                  />
              </div>
              <div className='loginPassword'>
                  <KeyIcon/>
                  <input
                  type={'password'}
                  placeholder='Password'
                  required
                  value={loginPassword}
                  onChange={(e)=>setLoginPassword(e.target.value)}
                  />
              </div>
              <Link to='/password/forgot'>Forgot Password ?</Link>
              <input
                  type='submit'
                  value= 'Login'
                  className='loginBtn'
                />
              <p>Don't have an account ? <Link to='/signup'>Register</Link></p>
          </form>
        </div>
        <img src={registerImg} alt="Your GIF" style={{height: '33.33vh', float: 'left', top:'18vmax' }} />
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
