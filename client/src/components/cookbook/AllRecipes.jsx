import { useSelector } from "react-redux";
import RecipeCard from "../RecipeCard";
import style from "../../pages/userCookbook.module.css";

const AllRecipes = ({ theme }) => {
  const state = useSelector((state) => state.users),
    { recipesUser, recipesFavorites } = state;
  const allRecipes = [...recipesUser, ...recipesFavorites];

  return (
    <section>
      <h2 className={`${style["subtitle"]}`}>All my recipes</h2>
      <div className={`${style["grid"]}`}>
        {allRecipes.map((recipe) => {
          return (
            <RecipeCard
              theme={theme}
              key={recipe.id}
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

export default AllRecipes;
