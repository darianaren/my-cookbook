import { useNavigate } from "react-router-dom";
import { icons } from "../utils/helpers/assets";
import { dietsName } from "../utils/helpers/dataForm";

import style from "./recipeCard.module.css";

const RecipeCard = ({ id, image, title, diets, healthScore, time, theme }) => {
  const navigate = useNavigate();

  const cardHandler = (event) => {
    event.preventDefault();
    navigate(`/recipe/${id}`);
  };

  return (
    <article
      className={`${style["grid"]} ${style[theme]}`}
      onClick={cardHandler}
    >
      <div className={style["image-container"]}>
        <img className={style["image"]} src={image} alt={title} />
      </div>

      <h2 className={`${style["title"]} ${style[theme]}`}>{title}</h2>

      {diets && diets.length > 0 ? (
        <div className={style["diets"]}>
          {diets.map((diet, index) => (
            <div key={`diet-card-${index}`}>
              <img className='icon-green' src={icons.check} alt='check' />
              <p>{dietsName[diet.name]}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className={style["no-diets"]}>
          This recipe does not meet the requirements to belong to any diet.
        </p>
      )}

      <div className={style["health"]}>
        <img
          className={`icon-red ${style["icon"]}`}
          src={icons.heart}
          alt='Health score.'
        />
        <p>{healthScore}</p>
      </div>

      <div className={style["time"]}>
        <img
          className={`icon-blue ${style["icon"]}`}
          src={icons.clock}
          alt='Time of preparation.'
        />
        <p>{time} min</p>
      </div>
    </article>
  );
};

export default RecipeCard;
