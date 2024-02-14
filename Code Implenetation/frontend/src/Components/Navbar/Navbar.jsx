import React from 'react'
import './style.css'
import profileImg from './profile_pic.JPG'

const Navbar = () => {
  return (
    <>
        <nav class="navbar">
            <a href="/" class="nav-item">Home</a>
            <a href="/members" class="nav-item">Member</a>
            <a href="/blogs" class="nav-item">Blog</a>
            <a href="/chat" class="nav-item">Chat</a>
            <div class="profile">
            <img src={profileImg} alt="Profile Photo" class="profile-photo"/>
            <span class="username">priyanshu799</span>
            </div>
        </nav>
    </>
  )
}

export default Navbar