import React from "react";
import Component from "./background";

const LoginPage = ({setSignIn}) => {
  return (
    <div>
      <Component setSignIn={setSignIn}/>
    </div>
  );
}

export default LoginPage;
