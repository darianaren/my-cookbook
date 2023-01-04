import { NavLink } from "react-router-dom";
import style from "../../layout/navBar.module.css";

const LoginButton = ({ theme }) => {
  return (
    <NavLink className={`${style["login"]} ${style[theme]}`} to='/login'>
      Login
    </NavLink>
  );
};

export default LoginButton;
