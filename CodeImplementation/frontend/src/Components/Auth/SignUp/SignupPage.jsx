import React from "react";
import Component from "./background";

function SignUp({setSignIn}) {
  return (
    <div>
      <Component setSignIn={setSignIn}/>
    </div>
  );
}

export default SignUp;
