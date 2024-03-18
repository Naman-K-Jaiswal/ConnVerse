import React from "react";
import image from "./Images/OAT.jpeg";
import logoimg from "./Images/Logo.png";
import './styleAlumn.css';
import Leftbox from "./Leftbox.jsx";

function Component() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh"
      }}
    >
      <Leftbox/>
      <div style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center" }}>
      </div>
      <div
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: `url(${image})`, /* Set image as background */
          backgroundSize: "cover", /* Cover the container with the image */
          backgroundPosition: "center", /* Center the image */
          width: "70%", /* Adjust width of container */
          minWidth: "60%", /* Ensure minimum width */
        }}
      >
      </div>
    </div>
  );
}

export default Component;
