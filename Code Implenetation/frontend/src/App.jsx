import React, {useState, useEffect} from 'react';
import Navbar from './Components/Navbar/Navbar';
import SignUp from './Components/Auth/SignUp/SignupPage'
import Alumn from './Components/Auth/Alumn/AlumnRegisterPage'
import Home from './Components/Home/Home'
import User from './Components/User/UserProfile'
import CreateBlog from './Components/Blog/CreateBlog/CreateBlogPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import BlogTemplate from './Components/Blog/IndividualBlog/BlogTemplate';
import ChatProvider from "./Context/ChatProvider";
import ChatPage from "./Pages/Chatpage";
import LoginPage from "./Components/Auth/Login/LoginPage";

const App = () => {
  // console.log(Cookies.get('Authorization'));
  const [signIn, setSignIn] = useState(true);

  // const getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // };

  // useEffect(() => {
  //   const checkAuthentication = () => {
  //     const tokenString = getCookie('Authorization'); 
  //     console.log(tokenString);
  //     const isAuthenticated = !!tokenString; 

  //     setSignIn(isAuthenticated);
  //   };

  //   checkAuthentication();

  //   const handleCookieChange = () => {
  //     checkAuthentication();
  //   };

  //   window.addEventListener('storage', handleCookieChange);

  //   return () => {
  //     window.removeEventListener('storage', handleCookieChange);
  //   };
  // }, []);

  return (
      <Routes>
        {!signIn && (
            <>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/login" element={<LoginComp setSignIn={setSignIn}/>} />
              <Route path="/signup" element={<SignUpComp setSignIn={setSignIn}/>} />
              <Route path="/alumn" element={<AlumnComp/>} />
            </>
        )}
        {signIn && (
            <>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/login" element={<LoginComp setSignIn={setSignIn}/>} />
              <Route path="/signup" element={<SignUpComp setSignIn={setSignIn}/>} />
              <Route path="/alumn" element={<AlumnComp/>} />
              <Route path="/home" element={<HomeComp setSignIn={setSignIn}/>} />
              <Route path="/createblog" element={<CreateBlogComp setSignIn={setSignIn}/>} />
              <Route path="/userprofile" element={<UserProfileComp setSignIn={setSignIn}/>} />
              <Route path="/blogtemp" element={<Blogtempcomp setSignIn={setSignIn}/>} />
              <Route path="/chat" element={<ChatMainPage setSignIn={setSignIn}/>} />
            </>
        )}
      </Routes>
  );
};

const Blogtempcomp = ({setSignIn}) => {
  return (
    <>
    <Navbar setSignIn={setSignIn}/>
    <BlogTemplate/>
  </>
  )
};

const ChatMainPage = ({setSignIn}) => {
  return (
    <>
      <Navbar setSignIn={setSignIn}/>
      <ChatProvider>
        <div className='ChatApp'>
          <ChatPage/>
        </div>
      </ChatProvider>
    </>
  )
};

const HomeComp = ({setSignIn}) => {
  return (
    <>
    <Navbar setSignIn={setSignIn}/>
    <Home/>
  </>
  )
};

const LoginComp = ({setSignIn}) => {
  return (
    <>
    <LoginPage setSignIn={setSignIn}/>
  </>
  )
};
const SignUpComp = ({setSignIn}) => {
  return (
    <>
    <SignUp setSignIn={setSignIn}/>
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


const CreateBlogComp = ({setSignIn}) => {
  return (
    <>
    <Navbar setSignIn={setSignIn}/>
    <CreateBlog/>
  </>
  )
};

const UserProfileComp = ({setSignIn}) => {
  return (
    <>
    <Navbar setSignIn={setSignIn}/>
    <User/>
  </>
  )
};

export default App;
