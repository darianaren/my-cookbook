import { useSelector } from "react-redux";

import style from "./loader.module.css";

const Loader = () => {
  const loadState = useSelector((state) => state.load),
    { load } = loadState;

  return (
    <div className={`${load} ${style["container"]}`}>
      <div className={` ${style["loader"]}`}></div>
    </div>
  );
};
export default Loader;
