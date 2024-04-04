import React, { useState } from 'react';
import styles from './LandingPage.module.css';
import MetaData from '../../MetaData';
import Logo from './Logo.png';
import {Particles} from './Particles';
import Typewriter from './Typewriter';
import Navbar1 from './Navbar';
import { useEffect } from 'react';
import Loader from '../Loader/Loader';

const LandingPage = () => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
      document.documentElement.style.overflow = 'visible';
    };
  }, []);

  return (
    <>
      <Particles init={init} setInit={setInit} />
      {!init ? <Loader/> : (
        <>
          <MetaData title='ConnVerse' />
        <Navbar1 />
        <div className={styles.ImageContainer}>
          {/* <Particles init={init} setInit={setInit} /> */}
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
      )}
    </>
  );

  return (
    <>
      <div className={styles.ImageContainer}>
        <Particles init={init} setInit={setInit} />
      </div>
      <MetaData title='ConnVerse' />
      <Navbar1 />
      <div className={styles.ImageContainer}>
        {/* <Particles init={init} setInit={setInit} /> */}
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
  );
}

export default LandingPage;
