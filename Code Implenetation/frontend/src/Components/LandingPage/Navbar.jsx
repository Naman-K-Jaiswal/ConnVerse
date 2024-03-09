import React from 'react';
import styles from './Navbar.module.css';
import WebLogo from './Logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to='/'><img src={WebLogo} alt="Logo" id={styles.NavBarImage} /></Link>
      <p className={styles.Conn}>Conn</p>
      <p className={styles.Verse} style={{ color: '#f2b65d' }}>Verse</p>
      <div className={styles.navlinks}>
        <Link to='/login' className={styles.navlink} style={{marginLeft: '56vw'}}>
          <button className={styles.navbutton}>Login</button>
        </Link>
        <Link to='/signup' className={styles.navlink} style={{marginLeft: '2vw'}}>
          <button className={styles.navbutton}>Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
