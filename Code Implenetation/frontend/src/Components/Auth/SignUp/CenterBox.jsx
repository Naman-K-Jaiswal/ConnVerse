import React from 'react';
import './style2.css';
import gif from "./vid2.gif"

const CenterBox = () => {
  return (
    <>
      <div className="center-box">
        <div className="container">
          <p className='Conn'>Conn</p>
          <p className='Verse'>Verse</p>
        </div>
        <img src={gif} alt="Your GIF" style={{height: '300px', float: 'left' }} />
        <div className="rectangular-box" style={{right: '80px', width: '400px', height: '350px', borderRadius:'15px', backgroundColor: 'white', position: 'absolute', zIndex: '9999'}}>
          <div className="container" style={{left:'20px',top:'30px'}}>
            <p className='Conn' style={{fontSize:'30px'}}>Conn</p>
            <p className='Verse' style={{fontSize:'30px'}}>Verse</p>
          </div>
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
