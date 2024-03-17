import React from 'react';
import { useState } from 'react';
import './styleSignUp.css';
import registerImg from "./registration.png";
import { Link } from 'react-router-dom';
import MetaData from '../../../MetaData.jsx';
import ValidationIcon from '@mui/icons-material/TaskAlt';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { sha256 } from 'js-sha256';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from "@chakra-ui/toast";
import Loader from '../../Loader/Loader.jsx';

const CenterBox = ({ setSignIn }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [showFirstForm, setShowFirstForm] = useState(true);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [validationCode, setValidationCode] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitFirstForm = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: signUpEmail }),
      });

      if (response.status === 200){
        setShowFirstForm(false);
      } else {
        toast({
            description: "Please enter valid IITK Email",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
      }
    } catch (error) {
      toast({
            description: "Please enter valid IITK Email",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
    }
    setLoading(false);
  }

  const base64ToBlob = (base64String, format) => {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: format });
  };

  const postDetails = async (pics, name, hashedPassword) => {
    try {
      const file = base64ToBlob(pics, "image/jpeg");
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "CS253-Chat");
      data.append("cloud_name", "diewczxvk");

      const response = await fetch(
          "https://api.cloudinary.com/v1_1/diewczxvk/image/upload",
          {
            method: "post",
            body: data,
          }
      );

      const responseData = await response.json();

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
            `http://localhost:5000/api/user`,
            {
              name: name,
              email: signUpEmail,
              password: hashedPassword,
              pic: responseData.url.toString(),
            },
            config
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
        setSignIn(true)
        navigate("/home");
      } catch (error) {
        toast({
            description: "An Error Occurred, Please Try Again",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
      }

    } catch (err) {
        toast({
            description: "An Error Occurred, Please Try Again",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
    }
  };


  const handleSignUp = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (signUpPassword !== signUpConfirmPassword) {
      toast({
            description: "Passwords Do Not Match",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
      setLoading(false);
      return;
    }

    const hashedPassword = sha256(signUpPassword);

    try {
      const response = await axios.post(
          `http://localhost:8080/signup`,
          {
            email: signUpEmail,
            old_password: validationCode,
            new_password: hashedPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
      );

      if (response.status === 200) {
        const responseData = response.data;
        localStorage.setItem("user", JSON.stringify({
            userId: responseData.id,
            userName: responseData.name,
            userImage: responseData.img
        }))
        await postDetails(responseData.img, responseData.name, hashedPassword)
        setLoading(false);
      } else {
        toast({
            description: response["error"],
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setLoading(false);
      }
    } catch (err) {
      toast({
            description: "Invalid OTP or User Already Exists",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
      navigate("/login");
      setLoading(false);
    }
  };
  return (
    <>
      <MetaData title='Login' />
      {loading ? <Loader /> :
      <div className="center-box">
        <div className="upperHalfDiv">          
          <div className="leftHalfDiv">
            <div className="container">
              <p className='Conn'>Conn</p>
              <p className='Verse'>Verse</p>
            </div>
            <img className='loginPageImage' src={registerImg} alt="Your GIF" style={{height: '33.33vh', float: 'left', top:'18vmax' }} />
          </div>

          <div className="rightHalfDiv" >
              
              <div className="subHeading">
                <p style={{fontSize:'20px', font:'Roboto'}}>Welcome To</p>
              </div>
              <div className="subHeading">
                <p className='Conn' style={{fontSize:'30px'}}>Conn</p>
                <p className='Verse' style={{fontSize:'30px'}}>Verse</p>
              </div>        
              {showFirstForm && (
              <form className='signUpForm' onSubmit={handleSubmitFirstForm}>
                <pre>Register</pre>
                <div className='line' style={{marginTop:'-3.2vh'}}></div>
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
      }
    </>
  );
};


export default CenterBox;
