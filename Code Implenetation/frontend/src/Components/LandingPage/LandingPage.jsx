import React from 'react';
import styles from './LandingPage.module.css';
import MetaData from '../../MetaData';
import Logo from './Logo.png';
import {Particles} from './Particles';
import Typewriter from './Typewriter';
import Navbar1 from './Navbar';

const LandingPage = () => {
  return (
    <>
      <MetaData title='ConnVerse' />
      <Navbar1 />
      <div className={styles.ImageContainer}>
        <Particles />
        <div className={styles.TypewriterContainer}>
          <Typewriter />
        </div>
      </div>
      <div className="flex flex-col items-end">
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: 'auto',
            height: '100vh',
            marginTop: '-50vh',
            marginLeft: '25%',
            marginBottom: '20px',
            position: 'absolute',
            left: '6vmax',
            top: '50%',
            transform: 'translateY(-50%)',
            animation: `${styles.fadeIn} 0.75s ease-out forwards`,
          }}
        />
      </div>
    </>
  )
}

export default LandingPage;
