import { useSelector } from "react-redux";

import NavBar from "../layout/NavBar";
import DietCard from "../components/diets/dietCard";
import { dietsInfo } from "../utils/helpers/dataForm";

import style from "./diets.module.css";

const Diets = () => {
  const themeState = useSelector((state) => state.theme),
    { theme } = themeState;
  return (
    <div className={`before-footer ${style["container"]} ${style[theme]}`}>
      <NavBar />
      <div className={`${style["padding"]}`}>
        <h1>Our diets</h1>
        <main>
          <p>
            There is a great variety of diets in the world. Here, in "CookBook"
            we show you several recipes that comply with ten different types of
            diets. Learn a little more about them:
          </p>
        </main>
        <section className={`${style["grid"]}`}>
          {dietsInfo.map((diet) => (
            <DietCard key={`${diet.alias}-card`} diet={diet} theme={theme} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Diets;
