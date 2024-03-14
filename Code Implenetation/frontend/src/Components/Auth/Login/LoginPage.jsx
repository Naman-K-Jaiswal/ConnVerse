import React from "react";
import Component from "./background";

const LoginPage = ({setSignIn, setUserId, setUserName, setUserImage}) => {
  return (
    <div>
      <Component setSignIn={setSignIn} setUserId={setUserId} setUserName={setUserName} setUserImage={setUserImage}/>
    </div>
  );
}

export default LoginPage;
