import { useSelector } from "react-redux";
import FavoriteCard from "./FavoriteCard";

import style from "../../pages/userCookbook.module.css";

const Favorites = ({ theme }) => {
  const state = useSelector((state) => state.users);
  const { recipesFavorites } = state;

  return (
    <section>
      <h2 className={`${style["subtitle"]}`}>My favorite recipes</h2>
      <div className={`${style["grid"]}`}>
        {recipesFavorites.map((recipe) => {
          return (
            <FavoriteCard
              key={recipe.id}
              theme={theme}
              id={recipe.id}
              image={recipe.image}
              title={recipe.title}
              diets={recipe.Diets}
              healthScore={recipe.healthScore}
              time={recipe.time}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Favorites;
