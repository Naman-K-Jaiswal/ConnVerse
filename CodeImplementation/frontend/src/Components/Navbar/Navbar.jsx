import React, {useEffect, useState, Fragment} from 'react';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/People';
import CreateIcon from '@mui/icons-material/Create';
import ChatIcon from '@mui/icons-material/Chat';
import { useToast } from "@chakra-ui/toast";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import { Backdrop } from '@material-ui/core'
import {SpeedDial, SpeedDialAction} from '@material-ui/lab'
import './style.css';
import profileImg from './profile_pic.JPG';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setSignIn }) => {
  const toast = useToast();
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  async function handleLogout(){
    try {
      const response = await fetch(`https://connverse-hcgzo.ondigitalocean.app/logout`, {
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
        toast({
          title: "Error In Logging Out!",
          description: "Please Try Again",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      toast({
          title: "Error In Logging Out!",
          description: "Please Try Again",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
    }
  };

  function profile(){
    navigate(`/userprofile/${user.userId}`);
  }

  const options = [
        {icon: <PersonIcon/>, name: "Profile", func: profile,},
        {icon: <ExitToAppIcon/>, name: "Logout", func: handleLogout,}
    ]

  return (
    <nav className="navbar">
      <div className='connversehead'>
      <p id='Conn1'>ConnVerse</p>
      </div>
      
      <ul className="nav-items" style={{zIndex:'11'}}>
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
              
      <Fragment>
        <Backdrop open={open} style={{zIndex: "10"}} />
        <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            onClose={()=> setOpen(false)}
            onOpen={()=> setOpen(true)}
            open={open}
            style={{zIndex : "11", marginRight:'2vmax'}}
            direction='down'
            className='profile-photo'
            icon={<img 
                className='speedDialIcon'
                src={user.userImage ? `data:image/jpeg;base64,${user.userImage}` : profileImg}
                alt='Profile'
                />}
            >
              {options.map((item)=>(
              <SpeedDialAction 
                  key={item.name} 
                  icon = {item.icon} 
                  tooltipTitle={item.name} 
                  onClick={item.func} 
                  tooltipOpen={window.innerWidth <= 600 ? true : false}
              />
              ))}
          </SpeedDial>
        </Fragment> 
        <div className="dropdown">
          <span className="username">{user.userName}</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


