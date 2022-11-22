import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <p>
        <a
          href="https://github.com/patrickdemers6/youtube-looper"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>{" "}
        | Created by{" "}
        <a href="https://demerstech.com/" target="_blank" rel="noreferrer">
          Patrick Demers
        </a>
      </p>
    </footer>
  );
};

export default Footer;
