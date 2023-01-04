import { useSelector } from "react-redux";

import NavBar from "../layout/NavBar";
import notFound from "../assets/notFound/data-not-found.png";

import style from "./error404.module.css";

const Error404 = () => {
  const themeState = useSelector((state) => state.theme),
    { theme } = themeState;
  return (
    <div className={`before-footer ${style[theme]}`}>
      <NavBar />
      <article className={style["container"]}>
        <img
          className={style["notFound"]}
          src={notFound}
          alt='Page not found.'
        />
        <h2>Error 404</h2>
        <h3>Page not found.</h3>
      </article>
    </div>
  );
};

export default Error404;
