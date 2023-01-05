import { useNavigate } from "react-router-dom";

import notFound from "../../assets/notFound/data-not-found.png";

import style from "./anyRecipe.module.css";

const AnyRecipe = ({ title, msg }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/create-recipe");
  };

  return (
    <div className={style["container"]}>
      <img src={notFound} alt='Data not found.' />
      <h2>{title}</h2>
      <h3>{msg}</h3>

      {msg === "You have not created a recipe." && (
        <button className='button button-box button-red' onClick={clickHandler}>
          Create Now
        </button>
      )}
    </div>
  );
};

export default AnyRecipe;
