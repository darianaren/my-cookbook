import { useDispatch, useSelector } from "react-redux";

import { soundOff, soundOn } from "../stateManagement/actions/soundActions";

import style from "./navBar.module.css";

const Sound = ({ pause, play }) => {
  const dispatch = useDispatch(),
    soundState = useSelector((state) => state.sound),
    { audio, sound } = soundState;

  audio.loop = true;

  const soundHandler = () => {
    if (sound) {
      audio.pause();
      dispatch(soundOff());
    } else {
      audio.play();
      dispatch(soundOn());
    }
  };
  return (
    <>
      {sound ? (
        <img
          className={`icon-blue ${style["sound"]}`}
          onClick={soundHandler}
          src={pause}
          alt='Pause'
        />
      ) : (
        <img
          className={`icon-blue ${style["sound"]}`}
          onClick={soundHandler}
          src={play}
          alt='Play'
        />
      )}
    </>
  );
};

export default Sound;
