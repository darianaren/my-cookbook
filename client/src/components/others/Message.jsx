import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { hiddenMessage } from "../../stateManagement/actions/messageActions";

import style from "./message.module.css";

const Message = () => {
  const dispatch = useDispatch(),
    messageState = useSelector((state) => state.message),
    { success, error, className } = messageState;

  useEffect(() => {
    setTimeout(function () {
      dispatch(hiddenMessage());
    }, 5000);
  }, [className]);

  return (
    <div className={`${style["container"]} ${style[className]}`}>
      {success && (
        <p className={style["success"]}>
          <span className={style["success-icon"]}>✓</span> {success}
        </p>
      )}
      {error && (
        <p className={style["error"]}>
          <span className={style["error-icon"]}>⨯</span> {error}
        </p>
      )}
    </div>
  );
};
export default Message;
