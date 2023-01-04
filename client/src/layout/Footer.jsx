import { useLocation } from "react-router-dom";

import linkedin from "../assets/contact/linkedin.png";
import gmail from "../assets/contact/gmail.png";
import behance from "../assets/contact/behance.png";

import style from "./footer.module.css";
import { useSelector } from "react-redux";

const Footer = () => {
  const { pathname } = useLocation(),
    themeState = useSelector((state) => state.theme);

  const { theme } = themeState;

  let visible = "visible";

  if (pathname === "/login" || pathname === "/register") {
    visible = "invisible";
  }

  return (
    <footer className={`${visible} ${style["footer"]} ${style[theme]}`}>
      <p>By Dariana Rengifo</p>
      <p className={style["small-letter"]}>Contact me:</p>
      <a
        href='https://www.linkedin.com/in/dariana-rengifo-05612ab4/'
        target='_blank'
        rel='noreferrer'
      >
        <img src={linkedin} alt='Linkedin' />
      </a>
      <a
        href='mailto:darianarengifo@gmail.com'
        target='_blank'
        rel='noreferrer'
      >
        <img src={gmail} alt='Gmail' />
      </a>
      <a
        href='https://www.behance.net/darianarengifo'
        target='_blank'
        rel='noreferrer'
      >
        <img src={behance} alt='Behance' />
      </a>
    </footer>
  );
};

export default Footer;
