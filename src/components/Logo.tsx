import React from "react";
import logo from "../Logo.png";

export const Logo = () => {
  return (
    <div>
      <img
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          width: window.innerWidth * 0.09,
          height: window.innerHeight * 0.18,
        }}
        src={logo}
      />
    </div>
  );
};
