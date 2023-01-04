import { useDispatch, useSelector } from "react-redux";
import { confirmationClose } from "../stateManagement/actions/confirmationActions";
import style from "./confirmationWindow.module.css";

const ConfirmationWindow = ({ message, handler }) => {
  const dispatch = useDispatch(),
    confirmationState = useSelector((state) => state.confirmation),
    themeState = useSelector((state) => state.theme),
    { confirmationWindow } = confirmationState,
    { theme } = themeState;

  const cancelHandler = (event) => {
    event.preventDefault();
    dispatch(confirmationClose());
  };
  const acceptHandler = (event) => {
    event.preventDefault();
    handler();
    dispatch(confirmationClose());
  };
  return (
    <div
      className={`${style["container"]} ${style[confirmationWindow]} ${style[theme]}`}
    >
      <p>{message}</p>
      <button className='button button-red button-left' onClick={cancelHandler}>
        No
      </button>
      <button
        className='button button-green button-right'
        onClick={acceptHandler}
      >
        Yes
      </button>
    </div>
  );
};

export default ConfirmationWindow;
