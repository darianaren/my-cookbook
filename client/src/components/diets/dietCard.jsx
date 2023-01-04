import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  currentPg,
  filters,
} from "../../stateManagement/actions/recipeActions";
import { updateSearch } from "../../stateManagement/actions/urlActions";

import style from "../../pages/diets.module.css";

const DietCard = ({ diet, theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = () => {
    dispatch(currentPg(1));
    dispatch(updateSearch(""));
    dispatch(filters({ diets: { [diet.alias]: true } }));
    navigate("/home");
  };

  return (
    <article className={`${style["diet-card"]} ${style[theme]}`}>
      <h2 onClick={clickHandler}>{diet.name}</h2>
      <p>
        {diet.description} <br />
        <br />
        <span
          className={`${style["view-recipes"]} ${style[theme]}`}
          onClick={clickHandler}
        >
          View {diet.name} recipes.
        </span>
      </p>
      <img src={diet[theme]} alt={diet.name} onClick={clickHandler} />
    </article>
  );
};

export default DietCard;
