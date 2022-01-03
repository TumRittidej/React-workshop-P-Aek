import React from "react";
import PropTypes from "prop-types";

const Footer = ({ title, website, postcode, isOpen }) => {
  // const {title,website,postcode} = props
  return (
    <div>
      <h1 style={styles.title}>
        {title} &copy; {new Date().getFullYear()}
      </h1>
      <p style={styles.title}>codingthailand</p>
      <p style={{color:'green',fontSize:'16'}}>
        {website} {postcode} {isOpen}
      </p>
    </div>
  );
};

const styles = {
  title: {
    color: 'red',
  }
}

Footer.propTypes = {
    title: PropTypes.string,
    website: PropTypes.string,
    postcode: PropTypes.number,
    isOpen: PropTypes.bool,
};

export default Footer;
