import React, {useEffect, useState} from 'react';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/People';
import CreateIcon from '@mui/icons-material/Create';
import ChatIcon from '@mui/icons-material/Chat';

import './style.css';
import profileImg from './profile_pic.JPG';
import {Link, useNavigate} from 'react-router-dom';

const Navbar = ({setSignIn}) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if(response.ok) {
        localStorage.clear();
        setSignIn(false);
        navigate("/")
      } else {
        alert("error in logging out, please try again!")
      }
    } catch (error) {
      alert("error in logging out, please try again!")
    }
  };

  return (
    <nav className="navbar">
      <div className='connversehead'>
      <p id='Conn1'>ConnVerse</p>
      </div>
      
      <ul className="nav-items">
        <li className="nav-item">
          <Link to="/home" className="nav-link">
            <HomeIcon />
            <span>Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/members" className="nav-link">
            <GroupIcon />
            <span>Members</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/createblog" className="nav-link">
            <CreateIcon />
            <span>Blog</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/chat" className="nav-link">
            <ChatIcon />
            <span>Chat</span>
          </Link>
        </li>
      </ul>
      <div className="profile">
        <img src={user.userImage ? `data:image/jpeg;base64,${user.userImage}` : profileImg} alt="Profile Photo" className="profile-photo"/>
        <div className="dropdown">
          <span className="username">{user.userName}</span>
          <button className="dropbtn" onClick={() => setIsOpen(!isOpen)}>&#x25BC;</button>
          {isOpen && (
            <div className="dropdown-content">
              <Link to="/profile">My Profile</Link>
              <Link to="/" onClick={handleLogout}>Log Out</Link>
            </div>
          )}
        </div>
      </div>


    </nav>
  );
}

export default Navbar;
