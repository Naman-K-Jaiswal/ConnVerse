import React from 'react';
import { useState } from 'react';
import './style2.css'; // Import the CSS file
import registerImg from "./registration.png";
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import MetaData from '../../../MetaData.jsx';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CenterBox = ({setSignIn}) => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const hashedPassword = CryptoJS.SHA256(loginPassword).toString(CryptoJS.enc.Hex);

      try {
          const response = await fetch('http://localhost:8080/login', {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: loginEmail, password: hashedPassword }),
          })

          if (response.ok) {
              const responseData = await response.json();
              try {
                  const config = {
                      headers: {
                          "Content-type": "application/json",
                      },
                  };

                  const { data } = await axios.post(
                      "http://localhost:5000/api/user/login",
                      { email: loginEmail, password : hashedPassword },
                      config
                  );
                  localStorage.setItem("userInfo", JSON.stringify(data));
                  localStorage.setItem("user", JSON.stringify({
                      userId: responseData.id,
                      userName: responseData.name,
                      userImage: responseData.img
                  }));
                  setSignIn(true);
                  navigate("/home")
              } catch (error) {
                  alert("an error occurred, please try again");
              }
          } else {
              alert(response["error"] || "an error occurred, please try again");
          }
      } catch (error) {
          alert("an error occurred, please try again");
      }
  }

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
            <form className='loginForm' onSubmit={handleLogin}>
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
              <Link to='/forgot'>Forgot Password ?</Link>
              <input
                  type='submit'
                  value= 'Login'
                  className='loginBtn'
                />
              <p>Don't have an account ? <Link to='/signup'>Register</Link></p>
          </form>
        </div>
        <img className='loginPageImage' src={registerImg} alt="Your GIF" style={{height: '33.33vh', float: 'left', top:'18vmax' }} />
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
