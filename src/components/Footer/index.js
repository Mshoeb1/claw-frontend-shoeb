import {
  FaGithub,
  FaLinkedin,
  FaFacebookF,
  FaTwitter,
  FaRegCopyright,
} from "react-icons/fa";

import "./index.css";

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-icon-container">
      <a
        href="https://github.com/Mshoeb1"
        target="_blank"
        rel="noreferrer"
        className="icon-colour  home-social-icons"
      >
        <FaGithub className="icon" />
      </a>{" "}
      <a
        href="https://www.linkedin.com/in/mohammad-shoeb-425573bb/"
        target="_blank"
        rel="noreferrer"
        className="icon-colour  home-social-icons"
      >
        <FaLinkedin className="icon" />
      </a>{" "}
      <a
        href="www.twitter.com"
        target="_blank"
        rel="noreferrer"
        className="icon-colour  home-social-icons"
      >
        <FaTwitter className="icon" />
      </a>{" "}
      <a
        href="www.facebook.com"
        target="_blank"
        rel="noreferrer"
        className="icon-colour  home-social-icons"
      >
        <FaFacebookF className="icon" />
      </a>
    </div>
    <h1 className="footer-heading">
      Copyright <FaRegCopyright className="icon-copy" />
      Designed by Mohammad Shoeb
    </h1>
  </footer>
);

export default Footer;
