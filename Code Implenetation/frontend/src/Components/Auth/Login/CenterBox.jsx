import React from 'react';
import { useState } from 'react';
import './styleLogin.css'; // Import the CSS file
import registerImg from "./registration.png";
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import MetaData from '../../../MetaData.jsx';
import { sha256 } from 'js-sha256';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from "@chakra-ui/toast";
import Loader from '../../Loader/Loader.jsx';

const CenterBox = ({ setSignIn }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const hashedPassword = sha256(loginPassword);

      try {
        console.log(process.env.BACKEND_URL)
          const response = await fetch(`http://localhost:8080/login`, {
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
                      `http://localhost:5000/api/user/login`,
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
                setLoading(false);
                navigate("/home")
              } catch (error) {
                toast({
                    title: "Please Try Again!",
                    description: "Don't Forget To Verify Your Details",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setLoading(false);
              }
          } else {
            toast({
                    title: "Please Try Again!",
                    description: response["error"] || "Don't Forget To Verify Your Details",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            setLoading(false);
          }
      } catch (error) {
        toast({
            title: "Please Try Again!",
            description: "Don't Forget To Verify Your Details",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setLoading(false);
      }
  }

  return (
    <>
      {loading ? <Loader /> :
        <div>
          <MetaData title='Login' />
          <div className="center-box">
        
            <div className="upperHalfDiv">
              <div className="leftHalfDiv">
                <div className="container">
                  <p className='Conn'>Conn</p>
                  <p className='Verse'>Verse</p>
                </div>
                <img className='loginPageImage' src={registerImg} alt="Your GIF" style={{ height: '33.33vh', float: 'left', top: '18vmax' }} />
              </div>

          
              <div className="rightHalfDiv" >
              
                <div className="subHeading">
                  <p style={{ fontSize: '20px', font: 'Roboto' }}>Welcome To</p>
                </div>
                <div className="subHeading">
                  <p className='Conn' style={{ fontSize: '30px' }}>Conn</p>
                  <p className='Verse' style={{ fontSize: '30px' }}>Verse</p>
                </div>
                <form className='loginForm' onSubmit={handleLogin}>
                  <div className='loginEmail'>
                    <EmailIcon />
                    <input
                      type='email'
                      placeholder='Email'
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className='loginPassword'>
                    <KeyIcon />
                    <input
                      type={'password'}
                      placeholder='Password'
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                  <Link to='/forgot'>Forgot Password ?</Link>
                  <input
                    type='submit'
                    value='Login'
                    className='loginBtn'
                  />
                  <p>Don't have an account ? <Link to='/signup'>Register</Link></p>
                </form>
              </div>
            </div>

            <div className="developerDetailsDiv">
              <div className="about-us-head">
                <p>About Us</p>
              </div>
              <div className="about-us">Welcome to ConnVerse – Your Gateway to Connection and Knowledge!
                At ConnVerse, we believe in the power of shared experiences and the strength of community.
                Founded with the mission to bridge the gap between present students and esteemed Alumni of the
                Indian Institute of Technology, Kanpur, ConnVerse serves as a dynamic platform for meaningful connections, insights,
                and knowledge exchange.</div>
            </div>
          </div>
          
        </div>
      }
    </>
  );
};


export default CenterBox;
