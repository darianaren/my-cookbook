import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import ConfirmationWindow from "../../layout/ConfirmationWindow";
import { closeUser } from "../../stateManagement/actions/userActions";
import { newMessage } from "../../stateManagement/actions/messageActions";
import { loadOff, loadOn } from "../../stateManagement/actions/loadActions";
import { confirmationOpen } from "../../stateManagement/actions/confirmationActions";

import style from "./userMenu.module.css";

const UserMenu = ({ isOpen, close, theme }) => {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    state = useSelector((state) => state.users),
    { user } = state;

  const confirmationHandler = async () => {
    try {
      dispatch(loadOn());
      await axios.put(`/users/logout/${user.id}`);
      dispatch(closeUser());
      dispatch(loadOff());
      dispatch(newMessage("Good bye! Come back soon.", "success"));
      navigate("/login");
    } catch (error) {
      dispatch(loadOff());
      dispatch(newMessage(error.response.data.error, "error"));
    }
  };

  const logoutHandler = async (event) => {
    event.preventDefault();
    dispatch(confirmationOpen());
  };

  const containerHandler = (e) => e.stopPropagation();

  return (
    <div
      className={`${style["modal"]} ${isOpen && style["is-open"]}  ${
        style[theme]
      }`}
      onClick={close}
    >
      <ConfirmationWindow
        message={"Are you sure you want to log out?"}
        handler={confirmationHandler}
      />
      <div
        className={`${style["container"]} ${style[theme]}`}
        onClick={containerHandler}
      >
        {user && <p className={style["title"]}>Hi, {user.firstName}!</p>}
        <NavLink
          className={`${style["link-green"]}  ${style[theme]}`}
          to='/my-profile'
        >
          Profile
        </NavLink>
        <NavLink
          className={`${style["link-green"]}  ${style[theme]}`}
          to='/recipes'
        >
          My Cook Book
        </NavLink>
        <NavLink
          className={`${style["link-green"]}  ${style[theme]}`}
          to='/create-recipe'
        >
          New Recipe
        </NavLink>
        <p
          className={`${style["link-red"]}  ${style[theme]}`}
          onClick={logoutHandler}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default UserMenu;
