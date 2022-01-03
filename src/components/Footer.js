import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="container">
        <p>© CodingThailand 2017-{new Date().getFullYear()}</p>
      </footer>
    </>
  );
};

export default Footer;
