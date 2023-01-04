import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { getApiCache } from "../utils/api/cacheApi";
import RecipeForm from "../components/recipeForm/RecipeForm";
import { myRecipes } from "../stateManagement/actions/userActions";
import { getAllRecipes } from "../stateManagement/actions/recipeActions";

const UpdateRecipe = () => {
  const dispatch = useDispatch(),
    recipesState = useSelector((state) => state.recipes),
    userState = useSelector((state) => state.users);

  const { oneRecipe } = recipesState,
    { user } = userState;

  const diets = {},
    dishTypes = {},
    occasions = {};

  if (oneRecipe.Diets.length > 0) {
    for (let diet of oneRecipe.Diets) {
      diets[diet.name] = true;
    }
  }
  if (oneRecipe.dishTypes.length > 0) {
    for (let dish of oneRecipe.dishTypes) {
      dishTypes[dish] = true;
    }
  }
  if (oneRecipe.occasions.length > 0) {
    for (let occ of oneRecipe.occasions) {
      occasions[occ] = true;
    }
  }

  const ingredientsState = oneRecipe.ingredients.map((ins, index) => {
    return { id: index, name: ins };
  });
  const stepsState = oneRecipe.instructions.map((step, index) => {
    return { id: index, name: step };
  });

  const initialForm = {
    title: oneRecipe.title,
    summary: oneRecipe.summary,
    ingredients: "",
    instructions: "",
    image: oneRecipe.image,
    cuisines: oneRecipe.cuisines[0],
    country: oneRecipe.cuisines[1] || "",
    servings: oneRecipe.servings,
    healthScore: oneRecipe.healthScore,
    time: oneRecipe.time,
    diets,
    dishTypes,
    occasions,
  };

  const axiosHandler = async (body) => {
    const updateRecipe = await axios.put(`/recipesDb/${oneRecipe.id}`, body);
    const updatedRecipes = await getApiCache("/recipes", true);
    const recipesUser = await axios.get(`/users/${user.id}/recipes`);
    dispatch(myRecipes(recipesUser.data));
    dispatch(getAllRecipes(updatedRecipes));
    return updateRecipe;
  };

  return (
    <RecipeForm
      type='Update'
      initialForm={initialForm}
      axiosHandler={axiosHandler}
      ingredientsState={ingredientsState}
      stepsState={stepsState}
    />
  );
};

export default UpdateRecipe;
