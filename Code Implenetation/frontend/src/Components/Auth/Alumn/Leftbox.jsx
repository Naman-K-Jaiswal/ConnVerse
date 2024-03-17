import React from 'react';
import { useState } from 'react';
import IITKlogo from './Images/IITK_logo.png';
import './styleAlumn.css';
import { Link, useNavigate } from 'react-router-dom';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EmailIcon from '@mui/icons-material/Email';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import emailjs from '@emailjs/browser';
import Loader from '../../Loader/Loader';
import { useToast } from "@chakra-ui/toast";

const Leftbox = () => {
    const toast = useToast();
    const [alumnEmail, setAlumnEmail] = useState('');
    const [alumnName, setAlumnName] = useState('');
    const [alumnBatch, setAlumnBatch] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        emailjs
            .send(
            'service_4banen1', // paste your ServiceID here (you'll get one when your service is created).
            'template_mtftc1a', // paste your TemplateID here (you'll find it under email templates).
            {
                from_name: alumnName,
                to_name: 'ConnVerse', // put your name here.
                from_email: alumnEmail,
                to_email: 'connverse22@gmail.com', //put your email here.
                message: alumnBatch,
            },
            'IZJzWB4BqQB-FHsHO' //paste your Public Key here. You'll get it in your profile section.
            )
            .then(
            () => {
                    toast({
                        title: "Thank You!",
                        description: "We will get back to you as soon as possible.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    navigate("/login");
                    setLoading(false);
            },
            (error) => {
                console.log(error);
                toast({
                        title: "Something went wrong!",
                        description: "Please try again.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                setLoading(false);
            }
        );
    };
    return (
        <>
        { loading ?<Loader/> :
        <div className='everything'>
            <div className="container1">
                <div className='Conn1'>Conn</div>
                <div className='Verse1'>Verse</div>
            </div>
            {/* <div className="line1"></div> */}
            
            <div className="alumhead1" style={{ marginBottom: '0.1vmax' }}>
                Greetings, Alum!
            </div>
            
            {/* <div className='alumline1'>Welcome to Connverse Community.</div> */}
            
            <form className='signUpAlumnForm' onSubmit={handleSubmit}>
                <div style={{fontSize:'1.8em',marginBottom:'2.2vh',marginLeft:'24vw',fontFamily:'600 2vmax "Roboto"',fontWeight:'bold'}}>Register</div>
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
            {/* <p className='copyright1'>&copy; 2024 MahaDevs. All rights reserved.</p> */}
                </div>
            }
        </>
    );
};

export default Leftbox;