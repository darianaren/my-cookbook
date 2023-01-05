import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  filteredRecipes,
  getAllRecipes,
  itemsPerPage,
  originalRecipes,
} from "../stateManagement/actions/recipeActions";
import Paged from "../layout/Paged";
import NavBar from "../layout/NavBar";
import AnyRecipe from "../components/recipes/AnyRecipe";
import RecipeCard from "../components/recipes/RecipeCard";
import { getApiCache } from "../utils/api/cacheApi";
import { newMessage } from "../stateManagement/actions/messageActions";
import { loadOff, loadOn } from "../stateManagement/actions/loadActions";

import style from "./recipes.module.css";

const Recipes = () => {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    userState = useSelector((state) => state.users),
    urlState = useSelector((state) => state.urls),
    recipesState = useSelector((state) => state.recipes),
    themeState = useSelector((state) => state.theme);

  const { theme } = themeState,
    { guest, user } = userState,
    { url, search } = urlState,
    { allRecipes, recipesPerPage, currentPage, activeFilters } = recipesState;

  const numberPerPage = 9,
    variable = numberPerPage * (currentPage - 1),
    initialIndex = 0 + variable,
    finalIndex = 9 + variable;

  useEffect(() => {
    if (!guest && !user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(loadOn());
    getApiCache(url + search)
      .then((recipes) => {
        dispatch(getAllRecipes(recipes));
        dispatch(originalRecipes(recipes));
        if (Object.keys(activeFilters).length > 0) {
          dispatch(filteredRecipes());
        }
        dispatch(loadOff());
      })
      .catch((error) => {
        dispatch(loadOff());
        dispatch(getAllRecipes([]));
        dispatch(originalRecipes([]));
        dispatch(newMessage("Recipes not found.", "error"));
      });
  }, [url, search]);

  useEffect(() => {
    dispatch(itemsPerPage(initialIndex, finalIndex));
  }, [currentPage, allRecipes]);

  return (
    <div className={`before-footer ${style[theme]}`}>
      <NavBar user={user} />
      <section className={style["padding"]}>
        {recipesPerPage.length === 0 ? (
          <AnyRecipe
            title={"Recipes not found"}
            msg={"No recipe with these characteristics was found."}
            theme={theme}
          />
        ) : (
          <div className={style["grid"]}>
            {recipesPerPage.map((recipe) => (
              <RecipeCard
                key={`recipe-card-${recipe.id}`}
                id={recipe.id}
                image={recipe.image}
                title={recipe.title}
                diets={recipe.Diets}
                healthScore={recipe.healthScore}
                time={recipe.time}
                theme={theme}
              />
            ))}
          </div>
        )}
      </section>
      {allRecipes.length > 9 && (
        <Paged
          currentPage={currentPage}
          numberOfItems={allRecipes.length}
          numberPerPage={numberPerPage}
          theme={theme}
        />
      )}
    </div>
  );
};

export default Recipes;
