import React from "react";
import image from "./OAT.jpeg";
import CenterBox from "./CenterBox";
import logoimg from "./Logo.png"

function Component({setSignIn, setUserId, setUserName, setUserImage}) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%", // Cover the entire container
        backgroundPosition: "center", // Center the background image
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
      }}
    >
      <CenterBox setSignIn={setSignIn} setUserId={setUserId} setUserName={setUserName} setUserImage={setUserImage}/>
      <img src={logoimg} alt="Your Image" className="logo"/>
    </div>
  );
}

export default Component;
