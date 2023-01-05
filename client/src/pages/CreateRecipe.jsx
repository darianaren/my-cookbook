import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllRecipes,
  originalRecipes,
} from "../stateManagement/actions/recipeActions";
import { getApiCache } from "../utils/api/cacheApi";
import RecipeForm from "../components/recipeForm/RecipeForm";
import { myRecipes } from "../stateManagement/actions/userActions";

const CreateRecipe = () => {
  const dispatch = useDispatch(),
    userState = useSelector((state) => state.users),
    { user } = userState;

  const initialForm = {
    title: "",
    summary: "",
    ingredients: "",
    instructions: "",
    image: "",
    cuisines: false,
    country: "",
    servings: 0,
    healthScore: 0,
    time: 0,
    diets: {},
    dishTypes: {},
    occasions: {},
  };

  const axiosHandler = async (body) => {
    const newRecipe = await axios.post("/recipes-db", body);
    const updatedRecipes = await getApiCache("/recipes", true);
    const recipesUser = await axios.get(`/users/my-recipes/${user.id}`);
    dispatch(myRecipes(recipesUser.data));
    dispatch(getAllRecipes(updatedRecipes));
    dispatch(originalRecipes(updatedRecipes));
    return newRecipe;
  };

  return (
    <RecipeForm
      initialForm={initialForm}
      axiosHandler={axiosHandler}
      ingredientsState={[]}
      stepsState={[]}
      titlePage='Create your own recipe'
    />
  );
};

export default CreateRecipe;
