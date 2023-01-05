import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MyRecipeCard from "./MyRecipeCard";
import { icons } from "../../utils/helpers/assets";

import style from "../../pages/userCookbook.module.css";

const MyRecipes = ({ theme }) => {
  const navigate = useNavigate(),
    state = useSelector((state) => state.users),
    { recipesUser } = state;

  const clickHandler = () => {
    navigate("/create-recipe");
  };

  return (
    <section>
      <h2 className={`${style["subtitle"]}`}>My Recipes</h2>
      <div className={`${style["grid-my-recipes"]}`}>
        <div
          className={`${style["add-recipe-container"]} ${style[theme]}`}
          onClick={clickHandler}
        >
          <img
            className={`icon-white ${style["add-recipe-image"]}`}
            src={icons.addNewRecipe}
            alt='Add new recipe'
          />
        </div>
        {recipesUser.map((recipe) => {
          return (
            <MyRecipeCard
              theme={theme}
              key={recipe.id}
              id={recipe.id}
              image={recipe.image}
              title={recipe.title}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MyRecipes;
