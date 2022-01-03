import React from "react";
import { logo } from "../style/style";
import useHover from "../hooks/UseHover";

const Logo = () => {
  const [hover, attrs] = useHover();

  const logoImage = {
    url: "./logo192.png",
  };

  return (
    <div>
      {/* <img src="./logo192.png" alt="logo" width='100' /> */}
      {hover ? <p>Hello Logo</p> : null}
      <img
        {...attrs}
        style={logo}
        src={logoImage.url}
        alt="logo"
        width="100"
      />
    </div>
  );
};

export default Logo;
