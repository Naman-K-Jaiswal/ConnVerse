import React, {useState, useEffect} from 'react';
import Navbar from './Components/Navbar/Navbar';
import SignUp from './Components/Auth/SignUp/SignupPage'
import Alumn from './Components/Auth/Alumn/AlumnRegisterPage'
import Home from './Components/Home/Home'
import CreateBlogPage from './Components/Blog/CreateBlog/CreateBlogPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import BlogTemplate from './Components/Blog/IndividualBlog/BlogTemplate';
import ChatProvider from "./Context/ChatProvider";
import ChatPage from "./Pages/Chatpage";
import LoginPage from "./Components/Auth/Login/LoginPage";
import ContactForm from './Components/Contact/Contact';
import Members from './Components/Members/Members';
import ForgotPass from './Components/Auth/ForgotPass/ForgotPass';
import UserProfile from './Components/User/UserProfile';

const App = () => {
  // console.log(Cookies.get('Authorization'));
  const [signIn, setSignIn] = useState(true);

  useEffect(() => {
    const handleUnload = () => {
        localStorage.clear();
        const cookies = document.cookie.split(";");

        cookies.forEach((cookie) => {
          const cookieParts = cookie.split('=');
          const cookieName = cookieParts[0].trim();
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        })
    }
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const tokenString = getCookie('Authorization');
      console.log(tokenString);
      const isAuthenticated = !!tokenString;

      setSignIn(isAuthenticated);
    };

    checkAuthentication();

    const handleCookieChange = () => {
      checkAuthentication();
    };

    window.addEventListener('storage', handleCookieChange);

    return () => {
      window.removeEventListener('storage', handleCookieChange);
    };
  }, []);

  return (
      <Routes>
        {!signIn && (
            <>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/login" element={<LoginComp setSignIn={setSignIn} />} />
              <Route path="/signup" element={<SignUpComp setSignIn={setSignIn} />} />
              <Route path="/alumn" element={<AlumnComp/>} />
              <Route path='/contact' element={<ContactForm/>} />
              <Route path="/forgot" element={<ForgotPass setSignIn={setSignIn}/>} />
            </>
        )}
        {signIn && (
            <>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/login" element={<LoginComp setSignIn={setSignIn} />} />
              <Route path="/signup" element={<SignUpComp setSignIn={setSignIn} />} />
              <Route path="/alumn" element={<AlumnComp/>} />
              <Route path="/forgot" element={<ForgotPass setSignIn={setSignIn}/>} />
              <Route path="/home" element={<HomeComp setSignIn={setSignIn}/>} />
              <Route path="/createblog" element={<CreateBlogComp setSignIn={setSignIn}/>} />
              <Route path="/userprofile/:id" element={<UserProfileComp setSignIn={setSignIn}/>} />
              <Route path='/contact' element={<ContactForm/>} />
              <Route path="/blog/:id" element={<Blogtempcomp setSignIn={setSignIn}/>} />
              <Route path="/chat" element={<ChatMainPage setSignIn={setSignIn}/>} />
              <Route path="/members" element={<MembersComp setSignIn={setSignIn}/>} />
            </>
        )}
      </Routes>
  );
};

const MembersComp = ({setSignIn}) => {
  return (
    <>
    <Navbar setSignIn={setSignIn}/>
    <Members />
  </>
  )
};


const Blogtempcomp = ({setSignIn}) => {
  return (
    <>
    <Navbar setSignIn={setSignIn}/>
    <BlogTemplate />
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
    <CreateBlogPage/>
  </>
  )
};

const UserProfileComp = ({setSignIn}) => {
  return (
    <>
    <Navbar setSignIn={setSignIn}/>
    <UserProfile/>
  </>
  )
};

export default App;
