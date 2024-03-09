import React from 'react';
import Navbar from './Components/Navbar/Navbar'; 
import Login from './Components/Auth/Login/LoginPage'
import SignUp from './Components/Auth/SignUp/SignupPage'
import Alumn from './Components/Auth/Alumn/AlumnRegisterPage'
import Home from './Components/Home/Home'
import User from './Components/User/UserProfile'
import CreateBlog from './Components/Blog/CreateBlog/CreateBlogPage'
import IndividualBlog from './Components/Blog/IndividualBlog/BlogTemplate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import BlogTemplate from './Components/Blog/IndividualBlog/BlogTemplate';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<HomeComp/>} />
        <Route path="/login" element={<LoginComp/>} />
        <Route path="/signup" element={<SignUpComp/>} />
        <Route path="/alumn" element={<AlumnComp/>} />
        <Route path="/createblog" element={<CreateBlogComp/>} />
        <Route path="/userprofile" element={<UserProfileComp/>} />
        <Route path="/individualblog" element={<IndividualBlogComp/>} />
        <Route path="/blogtemp" element={<Blogtempcomp/>} />
      </Routes>
    </Router>
  );
};

const Blogtempcomp = () => {
  return (
    <>
    <Navbar/>
    <BlogTemplate/>
  </>
  )
};

const HomeComp = () => {
  return (
    <>
    <Navbar/>
    <Home/>
  </>
  )
};

const LoginComp = () => {
  return (
    <>
    <Login/>
  </>
  )
};
const SignUpComp = () => {
  return (
    <>
    <SignUp/>
  </>
  )
};
const AlumnComp = () => {
  return (
    <>
    <Alumn/>
  </>
  )
};


const CreateBlogComp = () => {
  return (
    <>
    <Navbar/>
    <CreateBlog/>
  </>
  )
};

const IndividualBlogComp = () => {
  return (
    <>
    <Navbar/>
    <IndividualBlog/>
  </>
  )
};

const UserProfileComp = () => {
  return (
    <>
    <Navbar/>
    <User/>
  </>
  )
};

export default App;
